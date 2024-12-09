import { elem, formatTime, parseTimestampToSeconds } from "./AudioPlayerHelpers.mjs";

export function createProgressBar(ctx) {
    function seekAudio(event, ctx, progressWrapper) {
        const rect = progressWrapper.getBoundingClientRect();
        const clickRatio = (event.clientX - rect.left) / rect.width;
        ctx.audio.currentTime = Math.max(0, Math.min(clickRatio, 1)) * ctx.audio.duration;
    }

    const progressContainer = elem('div', { className: ctx.class?.progress?.container });
    const currentTimeDisplay = elem('div', {
        id: 'currentTime',
        className: ctx.class?.progress?.currentTimeDisplay,
        textContent: formatTime(ctx.audio.currentTime)
    });

    const progressWrapper = elem('div', { id: 'progress-wrapper', className: ctx.class?.progress?.wrapper });
    const progressBarInner = elem('div', { id: 'progress-bar', className: ctx.class?.progress?.barInner, style: { width: '0%' } });
    const timestampWrapper = elem('div', {id: 'timestamps-wrapper', className:ctx.class?.progress?.timestamps})

    const circleTip = elem('div', { 
        className: ctx.class?.progress?.circleTip, 
        style: { left: '0%' } 
    });

    progressWrapper.append(progressBarInner, circleTip);
    const onMouseMove = (event) => {
        if (ctx.isDragging) {
            seekAudio(event, ctx, progressWrapper);
        }
    };

    const onMouseUp = () => {
        if (ctx.isDragging) {
            ctx.isDragging = false;
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    };

    progressWrapper.addEventListener('mousedown', () => {
        ctx.isDragging = true;
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    progressWrapper.addEventListener('click', (e) => {
        seekAudio(e, ctx, progressWrapper);
    });

    const durationDisplay = elem('div', {
        className: ctx.class?.progress?.durationDisplay,
        textContent: formatTime(ctx.audio.duration || 0)
    });

    ctx.audio.addEventListener('timeupdate', () => {
        const progressPercent = (ctx.audio.currentTime / ctx.audio.duration) * 100;
        progressBarInner.style.width = `${progressPercent}%`;
        circleTip.style.left = `calc(${progressPercent}% - 3px)`;
        currentTimeDisplay.textContent = formatTime(ctx.audio.currentTime);
    });

    ctx.audio.addEventListener('loadedmetadata', () => {
        timestampWrapper.innerHTML = '';
        durationDisplay.textContent = formatTime(ctx.audio.duration);

        if (ctx.currentChapter.timestamps && Array.isArray(ctx.currentChapter.timestamps)) {
    
            ctx.currentChapter.timestamps.forEach(tsStr => {
                const tsSeconds = parseTimestampToSeconds(tsStr);
                if (tsSeconds <= ctx.audio.duration && tsSeconds >= 0) {
                    const tickPercent = (tsSeconds / ctx.audio.duration) * 100;
                    const tick = elem('div', {
                        className: `progress-tick ${ctx?.class?.progress?.tick}`,
                        style: { left: `${tickPercent}%` }
                    });
    
                    timestampWrapper.appendChild(tick);
                }
            });
        }
    });

    progressWrapper.append(timestampWrapper)
    progressContainer.append(currentTimeDisplay, progressWrapper, durationDisplay);

    return progressContainer;
}
