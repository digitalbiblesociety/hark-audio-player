import { elem } from './AudioPlayerHelpers.js'
import { fuzzySearch } from './AudioPlayerSearch.js';
import {selectBible, setCurrentChapter} from  './AudioPlayerProviders.js'
import { updateCurrentBibleBlock, updateBookList, handleChapterChange, chapterList } from './AudioPlayerChapterList.js';

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


