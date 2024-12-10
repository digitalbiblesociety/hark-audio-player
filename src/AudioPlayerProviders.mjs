const BASE_API_URL = 'https://arc.dbs.org';
const BASE_CONTENT_URL = 'https://content.dbs.org';
const BASE_DBP_URL = 'https://4.dbt.io/api/bibles';

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
    const baseBibles = await fetch(`${BASE_API_URL}/api/bibles`).then(response => response.json());

    let bibles = await fetch(`${BASE_CONTENT_URL}/bibles/audio-new/index.txt`).then(response => response.text());

    let output = [];

    bibles = bibles.split('\n');
    let unmatchedBibles = [];
    bibles.forEach(bible => {
        let bible_id = bible.split('_')[0];
        if (bible_id.includes('-')) {
            bible_id = bible.split('-')[0];
        }
        let found = false;

        for (let i = 0; i < baseBibles.length; i++) {
            const baseBible = baseBibles[i];
            if (bible_id === baseBible.id) {
                output.push({
                    id: bible,
                    abbr: baseBible.id,
                    iso: baseBible.iso,
                    ln: baseBible.ln,
                    tt: baseBible.tt,
                    tv: baseBible.tv,
                    ci: baseBible.ci,
                    cn: baseBible.cn,
                    tp: "hark"
                });
                found = true;
                break; // Exit loop once match is found
            }
        }

        if (!found) {
            unmatchedBibles.push(bible_id); // Add unmatched bible_id to array
        }
    });

    if (unmatchedBibles.length > 0) {
        //console.log("Unmatched bible_ids:", unmatchedBibles);
    } else {
        //console.log("All bible_ids matched in output.");
    }

    if (country_id !== 'all') {
        output = output.filter(bible => bible.ci === country_id);
    }

    if (provider !== 'all') {
        output = output.filter(bible => bible.id.includes(provider));
    }

    return output;
}

export async function harkSelect(id) {
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

    const filenameRequest = await fetch(`${BASE_CONTENT_URL}/bibles/audio-new/${id}/index.txt`);
    const filenames = await filenameRequest.text();
    const booksMap = new Map();
    const filenamePattern = /^\.\/\w+\/(\d+)_(\w+)_(\d+)\.mp3$/;

    filenames.split('\n').sort().forEach((filename) => {
        const match = filename.match(filenamePattern);
        if (match) {
            const [, bookNumber, bookName, chapterString] = match;
            const chapterNumber = parseInt(chapterString, 10);
            const key = books[bookNumber];
            if (!booksMap.has(key)) {
                booksMap.set(key, {
                    name: bookName,
                    book_number: bookNumber,
                    book_id: key,
                    chapters: []
                });
            }
            booksMap.get(key).chapters.push(chapterNumber);
        }
    });

    let timingFiles = [];
    try {
        const response = await fetch(`${BASE_CONTENT_URL}/bibles/audio-new/${id}/timingfiles/_index.txt`);
        if (response.ok) {
            timingFiles = (await response.text()).split("\n");
        } else {
            console.warn('Timing files not found or inaccessible.');
        }
    } catch (error) {
        console.warn('Failed to fetch timing files:', error.message);
    }

    for (const book of booksMap.values()) {
        book.chapters.sort((a, b) => a - b);
    }

    return {
        bible_id: id.split('_')[0],
        bible_folder: id,
        timestamps: timingFiles,
        data: Array.from(booksMap.values())
    };
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
    let safeChapter = chapter;


    if (!book?.chapters?.includes(chapter)) {
        safeChapter = 1;
    }

    if (ctx.currentType === 'hark') {
        const padLength = (book.book_number === "19") ? 3 : 2;

        ctx.currentChapter = {
            path: `https://content.dbs.org/bibles/audio-new/${ctx.currentBooks.bible_folder}/${book.book_number}_${book.name}_${safeChapter.toString().padStart(padLength, '0')}.mp3`,
            title: `${book.name} ${safeChapter}`,
            number: safeChapter,
            book_id: book.book_id,
            timestamps: []
        };
        ctx.audio.src = ctx.currentChapter.path

        const url = new URL(window.location);
        url.searchParams.set('book', book.book_id);
        url.searchParams.set('c', safeChapter);

        if (ctx.currentBooks.timestamps) {
            const timestampRegex = /Verse (\d+)	(\d+:\d+:\d+\.\d+)/gm;
            let timestampsText = await fetch(`https://content.dbs.org/bibles/audio-new/${ctx.currentBooks.bible_folder}/timingfiles/${ctx.currentBook.book_id}_${safeChapter.toString().padStart(3, '0')}.txt`).then(function (response) {
                return response.text();
            }).catch((error) => {
                console.error('Error:', error);
            })
            let verseTimestamps = [];

            let match;
            while ((match = timestampRegex.exec(timestampsText)) !== null) {
                // Extract verse number and timestamp from the regex match
                const verseNumber = match[1];
                const timestamp = match[2];
                verseTimestamps.push(timestamp);
            }

            //await currentBook = book;
            ctx.currentChapter.timestamps = verseTimestamps;
        }
    }
}
