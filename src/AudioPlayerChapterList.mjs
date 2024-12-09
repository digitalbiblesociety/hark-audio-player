import { elem } from "./AudioPlayerHelpers.mjs";
import { setCurrentChapter } from "./AudioPlayerProviders.mjs";

export function chapterList(ctx) {
    ctx.chapterListContainer.innerHTML = '';
    ctx.bibleListContainer.style.display = 'none';
    ctx.bookListContainer.style.display = 'none';
    ctx.chapterListContainer.style.display = 'block';

    const fragment = document.createDocumentFragment();
    ctx.currentBook.chapters.forEach(chapterNumber => {

        const chapterButton = elem('button', {
            className: `${ctx.class.chapterButton} ${(ctx.currentChapter.number == chapterNumber) ? ' ' + ctx.class.chapterButtonActive : ''}`,
            ariaLabel: `Play Chapter ${chapterNumber}`,
            textContent: chapterNumber,
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