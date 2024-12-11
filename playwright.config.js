// playwright.config.js
const { defineConfig } = require('playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000, // 30 seconds timeout
  expect: {
    timeout: 5000, // Timeout for assertions
  },
  use: {
    browserName: 'chromium',
    headless: false, // Set to false if you want to see the browser
    viewport: { width: 1280, height: 720 },
  },
});
