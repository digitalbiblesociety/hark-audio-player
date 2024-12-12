const BASE_API_URL = 'https://arc.dbs.org';
const BASE_CONTENT_URL = 'https://content.dbs.org';
const BASE_DBP_URL = 'https://4.dbt.io/api/bibles';

const books = {
    "01": "GEN", "02": "EXO", "03": "LEV", "04": "NUM", "05": "DEU", "06": "JOS",
    "07": "JDG", "08": "RUT", "09": "1SA", "10": "2SA", "11": "1KI", "12": "2KI",
    "13": "1CH", "14": "2CH", "15": "EZR", "16": "NEH", "17": "EST", "18": "JOB",
    "19": "PSA", "20": "PRO", "21": "ECC", "22": "SNG", "23": "ISA", "24": "JER",
    "25": "LAM", "26": "EZK", "27": "DAN", "28": "HOS", "29": "JOL", "30": "AMO",
    "31": "OBA", "32": "JON", "33": "MIC", "34": "NAM", "35": "HAB", "36": "ZEP",
    "37": "HAG", "38": "ZEC", "39": "MAL", "40": "MAT", "41": "MRK", "42": "LUK",
    "43": "JHN", "44": "ACT", "45": "ROM", "46": "1CO", "47": "2CO", "48": "GAL",
    "49": "EPH", "50": "PHP", "51": "COL", "52": "1TH", "53": "2TH", "54": "1TI",
    "55": "2TI", "56": "TIT", "57": "PHM", "58": "HEB", "59": "JAS", "60": "1PE",
    "61": "2PE", "62": "1JN", "63": "2JN", "64": "3JN", "65": "JUD", "66": "REV"
};


export async function loadProviders(player) {
    const providerFunctions = {
        hark: harkList,
        dbp: dbpList,
    };
      
    for (const provider of player.providers) {
        if (providerFunctions[provider]) {
          player.bibles = player.bibles.concat(await providerFunctions[provider]());
        }
    }
}

export async function harkList(country_id = 'all', provider = 'all') {
    const baseBibles = await fetch(`${BASE_API_URL}/api/bibles`).then(res => res.json());
    const bibles = await fetch(`${BASE_CONTENT_URL}/bibles/audio-new/index.txt`).then(res => res.text())
    const unmatchedBibles = [];
    let output = bibles.split('\n').map(bible => {
        let bible_id = bible.includes('-') ? bible.split('-')[0] : bible.split('_')[0];
        const baseBible = baseBibles.find(b => b.id === bible_id);
        if (baseBible) {
            return {
                id: bible, abbr: baseBible.id, iso: baseBible.iso, ln: baseBible.ln, tt: baseBible.tt, 
                tv: baseBible.tv, ci: baseBible.ci, cn: baseBible.cn, tp: "hark"
            };
        } else {
            unmatchedBibles.push(bible_id);
            return null;
        }
    }).filter(Boolean);
    if (country_id !== 'all') {
        output = output.filter(bible => bible.ci === country_id);
    }
    if (provider !== 'all') {
        output = output.filter(bible => bible.id.includes(provider));
    }
    return output;
}

export async function harkSelect(id) {
    const filenames = await fetch(`${BASE_CONTENT_URL}/bibles/audio-new/${id}/index.txt`).then(res => res.text());
    const booksMap = new Map();
    const filenamePattern = /^\.\/\w+\/(\d+)_(\w+)_(\d+)\.mp3$/;
    filenames.split('\n').sort().forEach(filename => {
        const match = filename.match(filenamePattern);
        if (match) {
            const [, bookNumber, bookName, chapterString] = match;
            const chapterNumber = +chapterString;
            const key = books[bookNumber];
            if (!booksMap.has(key)) {
                booksMap.set(key, { name: bookName, book_number: bookNumber, book_id: key, chapters: [] });
            }
            booksMap.get(key).chapters.push(chapterNumber);
        }
    });
    booksMap.forEach(book => book.chapters.sort((a, b) => a - b));
    return {
        bible_id: id.split('_')[0],
        bible_folder: id,
        timestamps: await harkFetchTimings(id, booksMap),
        data: [...booksMap.values()]
    };
}

export async function harkFetchTimings(id) {
    const response = await fetch(`${BASE_CONTENT_URL}/bibles/audio-new/${id}/timingfiles/_index.txt`);
    if(response.ok) {
        return (await response.text()).split("\n")
    }
    return []
}

export async function dbpList(country_id) {
    let initial_path = `https://4.dbt.io/api/bibles?v=4&key=${key}&media=audio`;
    if (country_id) {
        initial_path += '&country=' + country_id;
    }
    bibles = await fetch(initial_path).then(function (response) {
        return response.json();
    });
    let last_page = bibles.meta.pagination.last_page;
    let current_page = 1;
    while (current_page >= last_page) {
        current_page++;
        results = await fetch(initial_path + 'page=' + current_page).then(function (response) {
            return response.json();
        });
        bibles.data.concat(results.data);
    }
    return bibles;
}

export async function dbpAudioFileSet(bibleId, filesets) {
    for (const fileset of filesets) {
        if (fileset.codec === 'mp3') {
            current_fileset = fileset.id;
            break;
        }
    }
    let books = await fetch(`https://4.dbt.io/api/bibles/${bibleId}/book?v=4&key=${key}`).then(
        function (response) {
            return response.json();
        }
    );
    current_books.data = books['data'];
    current_books.visible = true
}

export async function dbpCurrentChapter(bible, book, chapter) {
    current_chapter = await fetch(`https://4.dbt.io/api/bibles/filesets/${bible}/${book}/${chapter}?v=4&key=${key}`)
    .then(function (response) {
        return response.json();
    });
    current_chapter = current_chapter['data'][0].path;
}

export async function selectBible(ctx, id) {
    ctx.query = '';
    const books = await harkSelect(id);
    ctx.currentBooks = books;

    const selectedBible = ctx.bibles.find(bible => bible.abbr === ctx.currentBooks.bible_id);
    ctx.currentBible = selectedBible;
    const url = new URL(window.location);
    url.searchParams.set('id', ctx.currentBible.id);
    await setBookAndChapter(ctx, books.data[0], 1);
}

async function setBookAndChapter(ctx, book, chapter) {
    ctx.currentBook = book;
    await setCurrentChapter(ctx, book, chapter);
}

export async function setCurrentChapter(ctx, book, chapter) {
    ctx.currentBook = book;

    if (ctx.currentType === 'hark') {
        await setHarkChapter(ctx, book, chapter)
    }
}

async function setHarkChapter(ctx, book, chapter) {
    const padLength = book.book_number === "19" ? 3 : 2;
    const path = `https://content.dbs.org/bibles/audio-new/${ctx.currentBooks.bible_folder}/${book.book_number}_${book.name}_${chapter.toString().padStart(padLength, '0')}.mp3`;
    const timestamps = [];
    if (Array.isArray(ctx.currentBooks.timestamps) && ctx.currentBooks.timestamps.length > 0) {
        try {
            const timingFilePath = `https://content.dbs.org/bibles/audio-new/${ctx.currentBooks.bible_folder}/timingfiles/${book.book_id}_${chapter.toString().padStart(3, '0')}.txt`;
            const timestampsResponse = await fetch(timingFilePath);
            if(timestampsResponse.ok) {
                const timestampRegex = /Verse (\d+)\t(\d+:\d+:\d+\.\d+)/gm;
                for (const match of timestampsText.matchAll(timestampRegex)) {
                    timestamps.push(match[2]);
                }
            }
        } catch (error) {
            console.error('Error fetching timestamps:', error);
        }
    }
    ctx.audio.src = ctx.currentChapter.path;
    ctx.currentChapter = {path, title:`${book.name} ${chapter}`, number: chapter, book_id: book.book_id, timestamps};
}
