import { elem, formatTime } from "./AudioPlayerHelpers.js";

export function createVolumeAndSleepControls(ctx) {
  const volumeRow = elem("div", { className: ctx.class.volume.row });
  const volumeInput = elem("input", {
    type: "range",
    min: "0",
    max: "1",
    step: "0.01",
    className: ctx.class.volume.input,
    id: "volume-control",
    value: ctx.audio.volume,
    "aria-label": "Volume Control",
  });
  volumeInput.addEventListener("input", () => ctx.audio.volume = parseFloat(volumeInput.value));

  const volumeLabel = elem("label", {
    htmlFor: "volume-control",
    className: ctx.class.volume.label,
    innerHTML: ctx.icons.volumeIcon,
  });
  volumeLabel.appendChild(volumeInput);
  volumeRow.appendChild(volumeLabel);
  const sleepTimerButton = createSleepTimer(ctx, volumeInput);
  volumeRow.appendChild(sleepTimerButton);

  return volumeRow;
}

function createSleepTimer(ctx, volumeInput) {
  const sleepTimerButton = elem("button", {
    className: ctx.class.sleepTimer.button,
    innerHTML: ctx.icons.sleepTimer,
    "aria-label": "Sleep Timer",
  });
  let sleepTimer = null;
  let elapsedTime = 0;
  const sleepDuration = 1 * 60 * 1000;
  const sleepTimerDuration = elem("span", {
    className: ctx.class.sleepTimer.duration,
    textContent: formatTime(ctx, sleepDuration / 1000),
    "aria-live": "polite",
  });
  sleepTimerButton.appendChild(sleepTimerDuration);
  sleepTimerButton.addEventListener("click", () => {
    if (sleepTimer) {
      clearInterval(sleepTimer);
      sleepTimer = null;
      volumeInput.value = 1;
      ctx.audio.volume = 1;
      elapsedTime = 0;
      updateSleepTimerUI(sleepDuration);
    } else {
      elapsedTime = 0;
      sleepTimer = setInterval(() => {
        elapsedTime += 1000;
        const remainingTime = sleepDuration - elapsedTime;
        const newVolume = remainingTime / sleepDuration;

        volumeInput.value = Math.max(0, newVolume);
        ctx.audio.volume = parseFloat(volumeInput.value);
        updateSleepTimerUI(remainingTime);

        if (elapsedTime >= sleepDuration) {
          clearInterval(sleepTimer);
          sleepTimer = null;
          ctx.audio.pause();
          updateSleepTimerUI(0);
        }
      }, 1000);
    }
  });

  ctx.audio.addEventListener("loadedmetadata", () => {
    sleepTimerDuration.textContent = formatTime(ctx, sleepDuration / 1000);
  });

  function updateSleepTimerUI(remainingTime) {
    const percentageElapsed = elapsedTime / sleepDuration;
    const dashArray = 2 * Math.PI * 9;
    sleepTimerDuration.textContent = formatTime(ctx, remainingTime / 1000);
    const sleepIcon = sleepTimerButton.querySelector("svg circle:nth-child(2)");
    if (sleepIcon) {
      sleepIcon.setAttribute(
        "stroke-dashoffset",
        (1 - percentageElapsed) * dashArray,
      );
    }
  }
  return sleepTimerButton;
}
