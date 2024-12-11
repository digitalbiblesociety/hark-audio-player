import { elem } from "./AudioPlayerHelpers.js";

export function createPlaybackRateControls(ctx) {
    const MIN_RATE = ctx.options?.playbackRate?.min ?? 0.5;
    const MAX_RATE = ctx.options?.playbackRate?.max ?? 2.25;
    const STEP = ctx.options?.playbackRate?.step ?? 0.25;

    const updateButtonState = (button, isDisabled) => {
        button.className = `${button.baseClassName} ${isDisabled ? ctx.class.playbackRate?.disabled : ''}`;
    };
    const changeRate = (delta) => {
        ctx.audio.playbackRate = Math.min(MAX_RATE, Math.max(MIN_RATE, ctx.audio.playbackRate + delta));
        playbackRateElem.textContent = ctx.audio.playbackRate.toFixed(2);
        
        updateButtonState(decrementButton, ctx.audio.playbackRate === MIN_RATE);
        updateButtonState(incrementButton, ctx.audio.playbackRate === MAX_RATE);
    };

    const playbackRateWrapperElem = elem('div', { className: ctx.class.playbackRate?.wrapper });
    const decrementButton = elem('button', {
        baseClassName: ctx.class.playbackRate?.decrease,
        className: ctx.class.playbackRate?.decrease,
        textContent: '-',
        onclick: () => changeRate(-STEP),
    });

    const playbackRateElem = elem('span', {
        className: ctx.class.playbackRate?.display,
        textContent: ctx.audio.playbackRate.toFixed(2),
    });
    const incrementButton = elem('button', {
        baseClassName: ctx.class.playbackRate?.increase,
        className: ctx.class.playbackRate?.increase,
        textContent: '+',
        onclick: () => changeRate(STEP),
    });

    const decrementIcon = elem('div', {className: ctx.class.decrementIcon, innerHTML: ctx.icons.speedSlow})
    const incrementIcon = elem('div', {className: ctx.class.incrementIcon, innerHTML: ctx.icons.speedFast})

    playbackRateWrapperElem.append(decrementIcon, decrementButton, playbackRateElem, incrementIcon, incrementButton);
    return playbackRateWrapperElem;
}