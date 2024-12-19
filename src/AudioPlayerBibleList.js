import { elem } from './AudioPlayerHelpers.js'
import { fuzzySearch } from './AudioPlayerSearch.js';
import { selectBible } from  './AudioPlayerProviders.js'
import { updateCurrentBibleBlock, updateBookList } from './AudioPlayerChapterList.js';

export function initBibleList(ctx) {
    ctx.bibleListContainer.innerHTML = '';
    const container = elem('div', { className: ctx.class.searchWrapper });
    const input = elem('input', {
        type: 'search',
        placeholder: `Filter (${ctx.bibles.length}) Audio Bibles`,
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
    const buttonWrap = elem('div', {className: ctx.class.bibleButton.wrapper});

    const button = elem('button', {className: ctx.class.bibleButton.button, onclick: () => handleBibleButtonClick(ctx, bible)});
    buttonWrap.appendChild(button)
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

    if(bible.dl) {
        const downloadButton = elem('button', {
            className: ctx.class.bibleButton.download,
            innerHTML: ctx.icons.download,
            onclick:() => handleBibleDownload(ctx, bible)})
        buttonWrap.appendChild(downloadButton)
    }

    return buttonWrap;
}

export async function handleBibleDownload(ctx, bible) {
    try {
        if (!bible.dl) {
            console.log("Bible object does not contain a valid download URL");
            return;
        }
        const dialog = elem('dialog', {className: ctx.class.bibleDownloadDialog.wrapper});
        const message = elem("div", {innerHTML: ctx?.download_text ?? `<div class="text-sm max-w-sm"></div>`});
        const copyright = elem("div", { innerHTML: `
            <p class="${ctx.class.bibleDownloadDialog.audio_copyright}">${bible.audio_copyright}</p>
            <p class="${ctx.class.bibleDownloadDialog.text_copyright}">${bible.text_copyright}</p>`
        });
        dialog.append(message, copyright);
        const downloadButton = elem("button",{className: ctx.class.bibleDownloadDialog.button_download,textContent: `Download ${bible.dl_size ?? ''}`});
        downloadButton.addEventListener("click", () => {
            const anchor = document.body.appendChild(elem('a', { href: bible.dl, download: '' }));
            anchor.click();
            anchor.remove();
            dialog.close();
            dialog.remove();
        });
        dialog.appendChild(downloadButton);
        const cancelButton = elem("button", {className: ctx.class.bibleDownloadDialog.cancel, textContent: "Cancel"});
        cancelButton.addEventListener("click", () => {dialog.close();document.body.removeChild(dialog);});
        dialog.appendChild(cancelButton);
        document.body.appendChild(dialog);
        dialog.showModal();
      } catch (error) {
          console.error("An error occurred while trying to display the dialog:", error);
      }
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


