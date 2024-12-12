import { elem } from "./AudioPlayerHelpers.js";
import { createPlaybackRateControls } from './MediaPlaybackRate.js'
import { createVolumeAndSleepControls } from './MediaSleepTimer.js'
import { handleChapterChange, handleBookChange } from "./AudioPlayerChapterList.js";
import { createProgressBar } from './MediaProgressBar.js'

export function createAudioElement(ctx) {
    const navRow = elem('div', { className: ctx.class.navRow });
    navRow.append(
        createBookNavigationButton(ctx, 'prev'),
        createChapterNavigationButton(ctx, 'prev'),
        createSkipButton(ctx, 'prev'),
        createPlayPauseButton(ctx),
        createSkipButton(ctx, 'next'),
        createChapterNavigationButton(ctx, 'next'),
        createBookNavigationButton(ctx, 'next')
    );
    const controlsContainer = elem('div', { className: ctx.class.controlsContainer });
    controlsContainer.append(
        createProgressBar(ctx),
        createPlaybackRateControls(ctx),
        navRow,
        createVolumeAndSleepControls(ctx)
    );
    return controlsContainer;
}

function createPlayPauseButton(ctx) {
    const playPauseButton = elem('button', {
        className: ctx.class.playPauseButton,
        onclick: () => ctx.audio.paused ? ctx.audio.play() : ctx.audio.pause()
    });

    const playIcon = elem('span', {className: ctx.class.playPauseIcon,innerHTML: ctx.icons.play});
    playPauseButton.appendChild(playIcon);
    ctx.audio.addEventListener('play', () => { playIcon.innerHTML = ctx.icons.pause; });
    ctx.audio.addEventListener('pause', () => { playIcon.innerHTML = ctx.icons.play; });
    return playPauseButton;
}


function createBookNavigationButton(ctx, dir) {
    return elem('button', {
        className: ctx.class[`${dir}BookButton`],
        innerHTML: ctx.icons[`${dir}Book`],
        onclick: () => {
            const index = ctx.currentBooks.data.findIndex(book => book.book_id === ctx.currentBook.book_id);
            const nextIndex = dir === 'prev' ? index - 1 : index + 1;
            if (ctx.currentBooks.data[nextIndex]) {
                handleBookChange(ctx, ctx.currentBooks.data[nextIndex].book_id);
                handleChapterChange(ctx, ctx.currentBooks.data[nextIndex], 1);
            }
        }
    });
}

function createChapterNavigationButton(ctx, dir) {
    return elem('button', {
        className: ctx.class[`${dir}ChapterButton`],
        innerHTML: ctx.icons[`${dir}Chapter`],
        onclick: () => changeChapter(ctx, dir)
    });
}

async function changeChapter(ctx, dir) {
    const chapterChange = (dir === 'prev') ? -1 : 1;
    const targetChapter = ctx.currentChapter.number + chapterChange;

    const inCurrentBook = dir === 'prev' ? (targetChapter > 0) : (targetChapter < ctx.currentBook.chapters.length + 1);
    if (inCurrentBook) {
        handleChapterChange(ctx, ctx.currentBook, targetChapter);
        return
    }

    const currentIndex = ctx.currentBooks.data.findIndex(book => book.book_id === ctx.currentBook.book_id);
    const targetIndex = currentIndex + chapterChange;
    const targetBook = ctx.currentBooks.data[targetIndex];
    if (targetBook) {
        handleBookChange(ctx, targetBook.book_id);
        handleChapterChange(ctx, targetBook, 1);
    }
}

function createSkipButton(ctx, dir) {
    return elem('button', {
        id: `${dir}SkipButton`,
        className: ctx.class[`${dir}SkipButton`],
        innerHTML: ctx.icons[`${dir}Skip`],
        onclick: () => {
            ctx.audio.currentTime + (dir == "next" ? 15 : -15);
            ctx.audio.currentTime = Math.min(Math.max(ctx.audio.currentTime, 0), ctx.audio.duration);
        }
    });
}