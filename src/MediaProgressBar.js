import { elem, formatTime, parseTimestampToSeconds } from "./AudioPlayerHelpers.js";

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

    const progressBarContainer = elem('div', { id: 'progress-barContainer', className: ctx.class?.progress?.barContainer });
    const progressWrapper = elem('div', { id: 'progress-barWrapper', className: ctx.class?.progress?.barWrapper });
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
          const sortedTimestamps = ctx.currentChapter.timestamps.map(parseTimestampToSeconds).filter(ts => ts >= 0 && ts <= ctx.audio.duration).sort((a, b) => a - b);
          const margin = .25;
      
          for (let i = 0; i < sortedTimestamps.length - 1; i++) {
            const current = sortedTimestamps[i];
            const next = sortedTimestamps[i + 1];
            const gapPercent = ((next - current) / ctx.audio.duration) * 100;
            const adjustedWidth = Math.max(0, gapPercent - margin);
            const adjustedLeft = ((current / ctx.audio.duration) * 100) + margin / 2;
            const tickWrapper = elem('div',{className: ctx.class.progress.tickWrapper,style:{position: 'absolute', left: `${adjustedLeft}%`, width: `${adjustedWidth}%`}});
      
            const tick = elem('div', {className: `progress-tick ${ctx?.class?.progress?.tick} w-full h-full`});
            tick.addEventListener('click', () => {ctx.audio.currentTime = current;});
      
            const verseLabel = elem('div', {className: ctx.class.progress.tickLabel});
            verseLabel.textContent = `${i + 1}`;

            tickWrapper.appendChild(tick);
            tickWrapper.appendChild(verseLabel);
            timestampWrapper.appendChild(tickWrapper);
          }
        }
      });
      
    
    
    progressBarContainer.append(currentTimeDisplay)
    progressBarContainer.append(progressWrapper)
    progressBarContainer.append(durationDisplay)
    progressContainer.append(progressBarContainer, timestampWrapper);

    return progressContainer;
}
