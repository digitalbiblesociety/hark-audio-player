const { test, expect } = require('playwright/test');

test.describe('Audio Player Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');

    const bibleListContainer = page.locator('#audio-player-bible-list-container');
    await bibleListContainer.waitFor();

    const bibleButton = bibleListContainer.locator('button').first();
    await bibleButton.click();
  });

  test('should display initial current time and duration', async ({ page }) => {
    const currentTimeDisplay = await page.locator('#currentTime');
    const durationDisplay = await page.locator('.progress-container .duration-display');

    await expect(currentTimeDisplay).toHaveText('00:00');
    await expect(durationDisplay).toHaveText(/^\d{1,2}:\d{2}$/);
  });

  test('should update progress bar on timeupdate', async ({ page }) => {
    const audioElement = await page.locator('audio');
    const progressBarInner = await page.locator('#progress-bar');
    const circleTip = await page.locator('.circle-tip');
    const duration = await audioElement.evaluate((audio) => audio.duration);
    const halfwayTime = duration / 2;

    await audioElement.evaluate((audio, time) => {
        audio.currentTime = time;
        audio.dispatchEvent(new Event('timeupdate'));
    }, halfwayTime);

    await expect(progressBarInner).toHaveCSS('width', '50%');
    await expect(circleTip).toHaveCSS('left', 'calc(50% - 3px)');
});

  test('should seek audio when progress bar is clicked', async ({ page }) => {
    const progressWrapper = await page.locator('#progress-wrapper');
    const audioElement = await page.locator('audio');
    const rect = await progressWrapper.boundingBox();
    const clickX = rect.x + rect.width / 2;

    await page.mouse.click(clickX, rect.y + rect.height / 2);
    const currentTime = await audioElement.evaluate((audio) => audio.currentTime);
    const duration = await audioElement.evaluate((audio) => audio.duration);
    expect(currentTime).toBeCloseTo(duration / 2, 1);
  });

  test('should display timestamps when metadata is loaded', async ({ page }) => {
    const audioElement = await page.locator('audio');
    const progressTicks = await page.locator('.progress-tick');

    // Simulate loadedmetadata event
    await audioElement.evaluate((audio) => {
      audio.dispatchEvent(new Event('loadedmetadata'));
    });

    const tickCount = await progressTicks.count();
    expect(tickCount).toBeGreaterThan(0);

    // Verify positions of the ticks
    for (let i = 0; i < tickCount; i++) {
      const tickLeft = await progressTicks.nth(i).evaluate((tick) => tick.style.left);
      expect(tickLeft).toMatch(/^\d+%$/);
    }
  });

  test('should handle drag and drop seeking', async ({ page }) => {
    const progressWrapper = await page.locator('#progress-wrapper');
    const audioElement = await page.locator('audio');

    // Get bounding box dimensions for progressWrapper
    const rect = await progressWrapper.boundingBox();

    // Simulate mousedown, mousemove, and mouseup for drag-and-drop
    await page.mouse.move(rect.x + 10, rect.y + rect.height / 2); // Start dragging
    await page.mouse.down();
    await page.mouse.move(rect.x + rect.width * 0.75, rect.y + rect.height / 2); // Drag to 75%
    await page.mouse.up();

    // Get the updated current time from the audio element
    const currentTime = await audioElement.evaluate((audio) => audio.currentTime);

    // Verify that the current time is approximately 75% of the duration
    const duration = await audioElement.evaluate((audio) => audio.duration);
    expect(currentTime).toBeCloseTo(duration * 0.75, 1);
  });
});
