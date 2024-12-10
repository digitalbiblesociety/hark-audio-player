import { elem } from "./AudioPlayerHelpers.mjs";
import { setCurrentChapter } from "./AudioPlayerProviders.mjs";
import { createPlaybackRateControls } from './MediaPlaybackRate.mjs'
import { createVolumeAndSleepControls } from './MediaSleepTimer.mjs'
import { handleChapterChange } from "./AudioPlayerChapterList.mjs";
import { handleBookChange } from "./AudioPlayerBibleList.mjs";
import { createProgressBar } from './MediaProgressBar.mjs'

export function createAudioElement(ctx) {
    const container = document.createDocumentFragment();
    const controlsContainer = elem('div', { className: ctx.class.controlsContainer });
    const navRow = elem('div', { className: ctx.class.navRow });

    const prevBookButton = elem('button', {
        className: ctx.class.prevBookButton,
        innerHTML: ctx.icons.PrevBook,
        onclick: () => {
            const index = ctx.currentBooks.data.findIndex(book => book.book_id === ctx.currentBook.book_id);
            if(ctx.currentBooks.data[index - 1]) {
                handleBookChange(ctx, ctx.currentBooks.data[index - 1].book_id)
                handleChapterChange(ctx, ctx.currentBooks.data[index - 1], 1)
            }
        }
    });

    const prevChapterButton = elem('button', {
        className: ctx.class.prevChapterButton,
        innerHTML: ctx.icons.PrevChapter,
        onclick: () => prevChapter(ctx)
    });

    const skipBackButton = createSkipButton(ctx, 'back');
    const playIcon = elem('span', {className: ctx.class.playPauseIcon,innerHTML: ctx.icons.play});
    const playPauseButton = elem('button', {
        className: ctx.class.playPauseButton,
        onclick: () => ctx.audio.paused ? ctx.audio.play() : ctx.audio.pause()
    });
    playPauseButton.appendChild(playIcon);
    ctx.audio.addEventListener('play', () => {
        playIcon.innerHTML = ctx.icons.pause;
    });
    ctx.audio.addEventListener('pause', () => {
        playIcon.innerHTML = ctx.icons.play;
    });


    const skipForwardButton = createSkipButton(ctx, 'forward');
    const nextChapterButton = elem('button', {
        className: ctx.class.nextChapterButton,
        innerHTML: ctx.icons.nextChapter,
        onclick: () => nextChapter(ctx)
    });

    const nextBookButton = elem('button', {
        className: ctx.class.nextBookButton,
        innerHTML: ctx.icons.nextBook,
        onclick: () => {
            const index = ctx.currentBooks.data.findIndex(book => book.book_id === ctx.currentBook.book_id);
            if(ctx.currentBooks.data[index + 1]) {
                handleBookChange(ctx, ctx.currentBooks.data[index + 1].book_id)
                handleChapterChange(ctx, ctx.currentBooks.data[index + 1], 1)
            }
        }
    });

    navRow.append(
        prevBookButton,
        prevChapterButton,
        skipBackButton,
        playPauseButton,
        skipForwardButton,
        nextChapterButton,
        nextBookButton
    );
    controlsContainer.append(navRow);
    controlsContainer.append(createProgressBar(ctx));
    const { volumeRow, sleepTimerButton } = createVolumeAndSleepControls(ctx);
    controlsContainer.append(createPlaybackRateControls(ctx));
    controlsContainer.appendChild(volumeRow);
    volumeRow.appendChild(sleepTimerButton);
    volumeRow.appendChild(sleepTimerButton);
    container.appendChild(volumeRow);
    container.appendChild(controlsContainer);

    return container;
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