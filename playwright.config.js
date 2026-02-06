import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// 1. Load your .env file
dotenv.config();

export default defineConfig({
  // Root directory for your tests
  testDir: './tests',

  // Maximum time one test can run (30-60s is good for e-commerce)
  timeout: 60 * 1000,

  expect: {
    timeout: 5000 // Time to wait for a specific condition (e.g., expect(button).toBeVisible())
  },

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests to handle "flakiness" (common on slow networks)
  retries: process.env.CI ? 2 : 1,

  // How many tests to run at once (Parallelism)
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [['html'], ['list']],

  use: {
    // Base URL so you can use await page.goto('/') in tests
    baseURL: 'https://www.daraz.com.np',

    // Record trace only on the first retry of a failed test
    trace: 'on-first-retry',
    
    // Capture screenshot after a failure
    screenshot: 'only-on-failure',
    
    // Video recording (useful for debugging complex flows)
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    //Test for mobile users (very important for Daraz!) 
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    */
  ],
});