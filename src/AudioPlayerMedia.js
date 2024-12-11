import { elem } from "./AudioPlayerHelpers.js";
import { createPlaybackRateControls } from './MediaPlaybackRate.js'
import { createVolumeAndSleepControls } from './MediaSleepTimer.js'
import { handleChapterChange } from "./AudioPlayerChapterList.js";
import { handleBookChange } from "./AudioPlayerBibleList.js";
import { createProgressBar } from './MediaProgressBar.js'

export function createAudioElement(ctx) {
    const navRow = elem('div', { className: ctx.class.navRow });
    navRow.append(
        createBookNavigationButton(ctx, 'prev'),
        createChapterNavigationButton(ctx, 'prev'),
        createSkipButton(ctx, 'back'),
        createPlayPauseButton(ctx),
        createSkipButton(ctx, 'forward'),
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
        onclick: () => {
            const action = dir === 'prev' ? prevChapter : nextChapter;
            action(ctx);
        }
    });
}

export async function prevChapter(ctx) {
    if ((ctx.currentChapter.number - 1) > 1) {
        handleChapterChange(ctx, ctx.currentBook, (ctx.currentChapter.number - 1))
    } else {
        const index = ctx.currentBooks.data.findIndex(book => book.book_id === ctx.currentBook.book_id);
        if(ctx.currentBooks.data[index - 1]) {
            handleBookChange(ctx, ctx.currentBooks.data[index - 1].book_id)
            handleChapterChange(ctx, ctx.currentBooks.data[index - 1], 1)
        }
    }
}

export async function nextChapter(ctx) {
    if (ctx.currentChapter.number < ctx.currentBook.chapters.length - 1) {
        handleChapterChange(ctx, ctx.currentBook, (ctx.currentChapter.number + 1))
    } else {
        const index = ctx.currentBooks.data.findIndex(book => book.book_id === ctx.currentBook.book_id);
        if(ctx.currentBooks.data[index + 1]) {
            handleBookChange(ctx, ctx.currentBooks.data[index + 1].book_id)
            handleChapterChange(ctx, ctx.currentBooks.data[index + 1], 1)
        }
    }
}

function createSkipButton(ctx, direction) {
    const isForward = direction === 'forward';
    const icon = isForward ? ctx.icons.skipForward : ctx.icons.skipBackward;
    const skipTime = isForward ? 15 : -15;

    return elem('button', {
        className: isForward ? ctx.class.skipForwardButton : ctx.class.skipBackButton,
        innerHTML: icon,
        onclick: () => {
            ctx.audio.currentTime += skipTime;
            if (ctx.audio.currentTime < 0) ctx.audio.currentTime = 0;
            if (ctx.audio.currentTime > ctx.audio.duration) ctx.audio.currentTime = ctx.audio.duration;
        }
    });
}