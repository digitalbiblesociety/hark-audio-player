import { elem, parseTimestampToSeconds } from './AudioPlayerHelpers.js'
import { fuzzySearch } from './AudioPlayerSearch.js';
import {selectBible, setCurrentChapter} from  './AudioPlayerProviders.js'
import { handleChapterChange, chapterList } from './AudioPlayerChapterList.js';

export function initBibleList(ctx) {
    ctx.bibleListContainer.innerHTML = '';
    const container = elem('div', { className: ctx.class.searchWrapper });
    const input = elem('input', {
        type: 'search',
        placeholder: 'Filter Audio Bibles',
        autocomplete: 'off',
        className: ctx.class.searchInput,
        oninput: () => {
            ctx.query = input.value;
            ctx.results = fuzzySearch(ctx.query, ctx.bibles, ['tt','tv','ln'])
            updateBibleGrid(ctx);
        }
    });
    input.setAttribute('aria-label', 'Search');
    container.appendChild(input);
    ctx.bibleListContainer.appendChild(container);
    const bibleListGrid = elem('div', { className: ctx.class.bibleListGrid });
    ctx.bibleListGrid = bibleListGrid;
    ctx.bibleListContainer.appendChild(bibleListGrid);
    updateBibleGrid(ctx);
}

function updateBibleGrid(ctx) {
    const bibleListGrid = ctx.bibleListGrid;
    bibleListGrid.innerHTML = '';
    const bibles = ctx.query ? ctx.results.map(result => result.item) : ctx.bibles;
    const fragment = document.createDocumentFragment();
    bibles.forEach(bible => fragment.appendChild(createBibleButton(ctx, bible)));
    bibleListGrid.appendChild(fragment);
}

function createBibleButton(ctx, bible) {
    const button = elem('button', {
        className: ctx.class.bibleButton.wrapper,
        onclick: () => handleBibleButtonClick(ctx, bible)
    });
    button.dataset.testId = bible.id;
    button.setAttribute('aria-label', bible.tv ?? bible.tt);

    const bibleListButtonLanguage = elem('div', { className: ctx.class.bibleButton.languageWrap });
    bibleListButtonLanguage.appendChild(elem('h2', { className: ctx.class.bibleButton.language, textContent: bible.ln }));
    bibleListButtonLanguage.appendChild(elem('small', { className: ctx.class.bibleButton.iso, textContent: bible.iso }));
    
    const bibleListButtonTitle = elem('div', { className: ctx.class.bibleButton.titleWrap });
    bibleListButtonTitle.appendChild(elem('h4', { className: ctx.class.bibleButton.title, textContent: bible.tt}));

    if (bible.tt !== bible.tv && bible.tv) {
        const tv = elem('p', {
            className: ctx.class.bibleButton.vernacular,
            textContent: bible.tv
        });
        bibleListButtonTitle.appendChild(tv);
    }

    button.appendChild(bibleListButtonLanguage);
    button.appendChild(bibleListButtonTitle);

    return button;
}

export async function handleBibleButtonClick(ctx, bible) {
    if (bible.tp === "hark") {
        ctx.view = "book";
        ctx.currentBible = bible;
        await selectBible(ctx, bible.id);
        updateCurrentBibleBlock(ctx, bible);
        ctx.render();
        const url = new URL(window.location);
        url.searchParams.set('bibleId', bible.id);
        window.history.replaceState({}, '', url);
    } else if (bible.tp === "dbl") {
        // Handle 'dbl' type if necessary
    }
}

export function updateCurrentBibleBlock(ctx, bible) {
    ctx.bibleBlock.innerHTML = '';
    ctx.bibleBlock.className = ctx.class.bibleBlock;

    const bibleBlockInfoWrap = elem('div', {className: ctx.class.bibleBlockInfoWrap})
    const bibleBlockLanguageGroup = elem('div', {className: ctx.class.bibleBlockLanguageGroup})
    bibleBlockLanguageGroup.appendChild(elem('div', { className: ctx.class.bibleBlockIso, innerText: bible.iso }));
    bibleBlockLanguageGroup.appendChild(elem('div', { innerText: bible.cn }));
    bibleBlockInfoWrap.append(bibleBlockLanguageGroup)

    const bibleBlockTitleGroup = elem('div', {className: ctx.class.bibleBlockTitleGroup})
    bibleBlockTitleGroup.appendChild(elem('div', {className: ctx.class.bibleBlockTitle,innerText: bible.tt}));
    if (bible.tv && bible.tv !== bible.tt) {
        bibleBlockTitleGroup.appendChild(elem('div', { className: ctx.class.bibleBlockVernacular, innerText: bible.tv }));
    }
    bibleBlockInfoWrap.appendChild(bibleBlockTitleGroup)

    const chapterBookSelectWrapper = elem('div', {className: ctx.class.selectBookChapterWrap})
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
        handleBookChange(ctx,  event.target.value)
    });
    const chapterSelect = elem('select', { className: ctx.class.selectChapter });
    if (ctx.currentBook && ctx.currentBook.chapters) {
        ctx.currentBook.chapters.forEach(chapter => {
            const option = elem('option', {
                value: chapter,
                innerText: chapter,
                selected: (chapter == ctx.currentChapter.number)
            });
            chapterSelect.appendChild(option);
        });
    }
    chapterSelect.addEventListener('change', (event) => handleChapterChange(ctx, ctx.currentBook, parseInt(event.target.value)))
    chapterBookSelectWrapper.appendChild(bookSelect);
    chapterBookSelectWrapper.appendChild(chapterSelect);

if (ctx.currentChapter && ctx.currentChapter.timestamps && Array.isArray(ctx.currentChapter.timestamps)) {
    const verseSelect = elem('select', { className: ctx.class.selectVerse });

    ctx.currentChapter.timestamps.forEach((timestamp, index) => {
        const verseNumber = index + 1;
        const option = elem('option', {
            value: verseNumber,
            innerText: `${verseNumber}`
        });
        verseSelect.appendChild(option);
    });

    verseSelect.addEventListener('change', (event) => {
        const selectedVerse = parseInt(event.target.value);
        const verseIndex = selectedVerse - 1;
        if (ctx.currentChapter.timestamps && ctx.currentChapter.timestamps[verseIndex]) {
            const tsStr = ctx.currentChapter.timestamps[verseIndex];
            const verseTime = parseTimestampToSeconds(tsStr);
            ctx.audio.currentTime = verseTime;
        }
    });

    const verseColonSeparator = elem('div',{innerText:':',className:ctx.class.selectVerseSeparator})
    chapterBookSelectWrapper.appendChild(verseColonSeparator)
    chapterBookSelectWrapper.appendChild(verseSelect);
    ctx.verseSelect = verseSelect;
}

if (ctx.verseSelect) {
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

        // Only update the select if the verse actually changed
        if (currentVerseIndex !== -1 && currentVerseIndex !== lastSelectedVerse) {
            lastSelectedVerse = currentVerseIndex;
            // Verses are 1-based in the select, so add 1
            ctx.verseSelect.value = currentVerseIndex + 1;
        }
    });
}

    ctx.bookSelect = bookSelect
    ctx.chapterSelect = chapterSelect
    
    const bibleBlockButtonGroup = elem('div', {className: ctx.class.bibleBlockButtonGroup})
    bibleBlockButtonGroup.appendChild(elem('button', {
        innerHTML: ctx.icons.bibles,
        className: ctx.class.bibleListNavButton,
        onclick: () => {
            ctx.view = 'bible';
            ctx.render();
        }
    }))
    if (ctx.view === "chapter") {
        bibleBlockButtonGroup.appendChild(elem('button', {
            innerHTML: ctx.icons.books,
            className: ctx.class.bookListNavButton,
            onclick: () => {
                ctx.view = 'book';
                updateBookList(ctx);
                ctx.render();
            }
        }));
    }
    if (ctx.view === "book") {
        bibleBlockButtonGroup.appendChild(elem('button', {
            innerHTML: ctx.icons.chapters,
            className: ctx.class.chapterListNavButton,
            onclick: () => {
                ctx.view = 'chapter';
                chapterList(ctx);
                ctx.render();
            }
        }));
    }
    bibleBlockInfoWrap.append(bibleBlockButtonGroup)
    ctx.bibleBlock.append(bibleBlockInfoWrap)
    ctx.bibleBlock.appendChild(chapterBookSelectWrapper)
    updateBookList(ctx);
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

export function initBookList(ctx) {
    const searchInput = elem('input', {
        type: 'search',
        placeholder: ctx.i18n?.filter_books ?? 'Filter Books',
        className: ctx.class.searchInput,
        ariaLabel: 'search',
        autocomplete: 'off',
        oninput: () => {
            ctx.query = searchInput.value;
            console.log(searchInput.value, ctx.currentBooks.data)
            ctx.resultsBooks = fuzzySearch(ctx.query, ctx.currentBooks.data, ['name'])
            updateBookList(ctx);
        }
    });
    const searchInputContainer = elem('div', { className: ctx.class.searchInputContainer });
    searchInputContainer.appendChild(searchInput);
    ctx.bookListContainer.appendChild(searchInputContainer);
    ctx.bookListContainer.appendChild((ctx.bookListGrid = elem('div', { className: ctx.class.bookListGrid })));
    updateBookList(ctx);
}

export function createBookButton(ctx, book) {
    const button = elem('button', {
        className: `${book.book_id} ${ctx.class.bookListButton} ${((ctx.currentBook.book_id == book.book_id) ? ctx.class.bookListButtonActive : '')}`,
        ariaLabel: book.name,
        onclick: () => handleBookChange(ctx, book.book_id)
    });
    button.dataset.bookId = book.book_id;
    const contentContainer = elem('div');
    contentContainer.append(
        elem('h2', { className: ctx.class.bookListTitle, textContent: book.name }),
        elem('h3', { className: ctx.class.bookListId, textContent: book.book_id })
    );
    button.appendChild(contentContainer);
    return button;
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
}