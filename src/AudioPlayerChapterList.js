import { setCurrentChapter } from "./AudioPlayerProviders.js";
import { elem, parseTimestampToSeconds } from './AudioPlayerHelpers.js'
import { createBibleBlockButtons } from "./AudioPlayerNavigation.js";


export function updateCurrentBibleBlock(ctx, bible) {
    ctx.bibleBlock.innerHTML = '';
    ctx.bibleBlock.className = ctx.class.bibleBlock.wrapper;
    const bibleBlockInfoWrap = createBibleBlockInfoWrap(ctx, bible);
    const chapterBookSelectWrapper = elem('div', { className: ctx.class.selectBookChapterWrap });
    chapterBookSelectWrapper.append(createBookSelector(ctx), createChapterSelector(ctx));
    createVerseSelector(ctx, chapterBookSelectWrapper);
    bibleBlockInfoWrap.append(createBibleBlockButtons(ctx));
    ctx.bibleBlock.append(bibleBlockInfoWrap,chapterBookSelectWrapper);
}

function createBibleBlockInfoWrap(ctx, bible) {
    const bibleBlockInfoWrap = elem('div', { className: ctx.class.bibleBlock.infoWrap });
    const bibleBlockLanguageGroup = elem('div', { className: ctx.class.bibleBlock.languageGroup });
    bibleBlockLanguageGroup.append(
        elem('div', { className: ctx.class.bibleBlock.iso, innerText: bible.iso }),
        elem('div', { innerText: bible.cn })
    );
    bibleBlockInfoWrap.append(bibleBlockLanguageGroup);
    const bibleBlockTitleGroup = elem('div', { className: ctx.class.bibleBlock.titleGroup });
    bibleBlockTitleGroup.appendChild(elem('div', { className: ctx.class.bibleBlock.title, innerText: bible.tt }));
    if (bible.tv && bible.tv !== bible.tt) {
        bibleBlockTitleGroup.appendChild(elem('div', { className: ctx.class.bibleBlock.vernacular, innerText: bible.tv }));
    }
    bibleBlockInfoWrap.appendChild(bibleBlockTitleGroup);
    return bibleBlockInfoWrap;
}

export function updateBookList(ctx) {
    const bookListGrid = ctx.bookListGrid;
    bookListGrid.innerHTML = '';
    if (ctx.resultsBooks && ctx.resultsBooks.length && ctx.query !== '') {
        ctx.resultsBooks.forEach(result => {
            bookListGrid.appendChild(createBookButton(ctx, result.item));
        });
    } else if (ctx.currentBooks && ctx.query === '') {
        if (ctx.currentBooks['data']) {
            ctx.currentBooks['data'].forEach(book => {
                bookListGrid.appendChild(createBookButton(ctx, book));
            });
        }
    }

    ctx.copyrightContainer.innerHTML = '';
    if(ctx.currentBible.audio_copyright) {
        ctx.copyrightContainer.appendChild(elem('div', { className: ctx.class.copyright.copyrightAudio, innerText: ctx.currentBible?.audio_copyright }));
    }
    if(ctx.currentBible.text_copyright) {
        ctx.copyrightContainer.appendChild(elem('div', { className: ctx.class.copyright.copyrightText, innerText: ctx.currentBible?.text_copyright }));
    }
}

export function createBookButton(ctx, book) {
    const button = elem('button', {
        className: `${book.book_id} ${ctx.class.bookList.button} ${((ctx.currentBook.book_id == book.book_id) ? ctx.class.bookList.ButtonActive : '')}`,
        ariaLabel: book.name,
        onclick: () => handleBookChange(ctx, book.book_id)
    });
    button.dataset.bookId = book.book_id;
    const contentContainer = elem('div', { className: ctx.class.bookList.buttonContentWrapper});
    contentContainer.append(
        elem('h2', { className: ctx.class.bookList.title, textContent: book.name }),
        elem('h3', { className: ctx.class.bookList.id, textContent: book.book_id })
    );
    button.appendChild(contentContainer);
    return button;
}

export function handleBookChange(ctx, bookId, chapter = 1) {
    const selectedBook = ctx.currentBooks.data.find(book => book.book_id === bookId);
    if (!selectedBook) return;

    setCurrentChapter(selectedBook, chapter);
    const url = new URL(window.location);
    url.searchParams.set('bookId', selectedBook.book_id);
    window.history.replaceState({}, '', url);

    ctx.query = '';
    ctx.chapterListContainer.style.display = "block";
    ctx.view = "chapter";
    ctx.currentBook = selectedBook;

    chapterList(ctx);
    updateCurrentBibleBlock(ctx, ctx.currentBible);
}

function createBookSelector(ctx) {
    const bookSelect = elem('select', { className: ctx.class.selectBook });
    if (ctx.currentBooks && ctx.currentBooks.data) {
        ctx.currentBooks.data.forEach(book => {
            const option = elem('option', {
                value: book.book_id,
                innerText: book.name,
                selected: (book.book_id === ctx.currentBook.book_id)
            });
            bookSelect.appendChild(option);
        });
    }
    bookSelect.addEventListener('change', (event) => {
        handleBookChange(ctx, event.target.value);
    });
    ctx.bookSelect = bookSelect;
    return bookSelect;
}

function createChapterSelector(ctx) {
    const chapterSelect = elem('select', { className: ctx.class.selectChapter });
    if (ctx.currentBook && ctx.currentBook.chapters) {
        ctx.currentBook.chapters.forEach(chapter => {
            const option = elem('option', {
                value: chapter,
                innerText: ctx.numeralFormatter.format(chapter),
                selected: (chapter == ctx.currentChapter.number)
            });
            chapterSelect.appendChild(option);
        });
    }
    chapterSelect.addEventListener('change', (event) =>
        handleChapterChange(ctx, ctx.currentBook, parseInt(event.target.value))
    );
    ctx.chapterSelect = chapterSelect;
    return chapterSelect;
}

function createVerseSelector(ctx, chapterBookSelectWrapper) {
    if (!ctx.currentChapter || !ctx.currentChapter.timestamps || ctx.currentChapter.timestamps.length == 0) return;
    const verseSelect = elem('select', { className: ctx.class.selectVerse });
    ctx.currentChapter.timestamps.forEach((timestamp, index) => {
        const verseNumber = index + 1;
        const option = elem('option', {
            value: verseNumber,
            innerText: ctx.numeralFormatter.format(parseInt(verseNumber))
        });
        verseSelect.appendChild(option);
    });
    verseSelect.addEventListener('change', (event) => {
        const selectedVerse = parseInt(event.target.value, 10);
        const verseIndex = selectedVerse - 1;
        if (ctx.currentChapter.timestamps && ctx.currentChapter.timestamps[verseIndex]) {
            const tsStr = ctx.currentChapter.timestamps[verseIndex];
            const verseTime = parseTimestampToSeconds(tsStr);
            ctx.audio.currentTime = verseTime;
        }
    });
    const verseColonSeparator = elem('div', {innerText: ':',className: ctx.class.selectVerseSeparator});
    chapterBookSelectWrapper.append(verseColonSeparator,verseSelect);
    ctx.verseSelect = verseSelect;
    addVerseHighlightOnTimeUpdate(ctx);
}

function addVerseHighlightOnTimeUpdate(ctx) {
    let lastSelectedVerse = null;
    ctx.audio.addEventListener('timeupdate', () => {
        const currentTime = ctx.audio.currentTime;
        const verseTimes = ctx.currentChapter.timestamps;
        let currentVerseIndex = -1;
        for (let i = 0; i < verseTimes.length; i++) {
            if (currentTime >= parseTimestampToSeconds(verseTimes[i])) {
                currentVerseIndex = i;
            } else {
                break;
            }
        }
        if (currentVerseIndex !== -1 && currentVerseIndex !== lastSelectedVerse) {
            lastSelectedVerse = currentVerseIndex;
            ctx.verseSelect.value = currentVerseIndex + 1;
        }
    });
}

export function chapterList(ctx) {
    ctx.chapterListContainer.innerHTML = '';
    ctx.bibleListContainer.style.display = 'none';
    ctx.bookListContainer.style.display = 'none';
    ctx.chapterListContainer.style.display = 'block';

    const fragment = document.createDocumentFragment();
    ctx.currentBook.chapters.forEach(chapterNumber => {

        const chapterButton = elem('button', {
            className: `${ctx.class.chapterList.button} ${(ctx.currentChapter.number == chapterNumber) ? ' ' + ctx.class.chapterList.buttonActive : ''}`,
            ariaLabel: `Play Chapter ${chapterNumber}`,
            textContent: ctx.numeralFormatter.format(chapterNumber),
            onclick: () => handleChapterChange(ctx, ctx.currentBook, chapterNumber)
        });

        fragment.appendChild(chapterButton)}
    );
    ctx.chapterListContainer.appendChild(fragment);
    if(ctx.currentBook?.book_id) {
        const bookArt = ctx.art[ctx.currentBook.book_id]?.[0];
        if (!bookArt) {
            console.warn(`No art found for book ID: ${ctx.currentBook.book_id}`);
            return;
        }
        const artElement = document.createElement('img');
        artElement.src = `./img/chars/${bookArt.file}`;
        artElement.className = bookArt.class;
        ctx.chapterListContainer.appendChild(artElement);
    }
}

export function handleChapterChange(ctx, book, chapterNumber) {
    setCurrentChapter(ctx, book, chapterNumber);
    ctx.chapterSelect.value = chapterNumber
    ctx.audio.play();
    const playPauseIcon = document.querySelector(`.icon-play`);
    playPauseIcon.innerHTML = ctx.audio.paused ? ctx.icons.play : ctx.icons.pause;
    chapterList(ctx)
}
