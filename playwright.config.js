import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load your .env file
dotenv.config();

// Define where the authentication state will be stored
export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');


export default defineConfig({
  testDir: './tests',  // Root directory for your tests
  timeout: 60 * 1000,  // Maximum time one test can run (30-60s is good for e-commerce)
  expect: { timeout: 5000 },  // Time to wait for a specific condition (e.g., expect(button).toBeVisible())
  forbidOnly: !!process.env.CI,  // Fail the build on CI if you accidentally left test.only in the source code
  retries: process.env.CI ? 2 : 1,  // Retry failed tests to handle "flakiness" (common on slow networks)
  workers: process.env.CI ? 1 : undefined,  // How many tests to run at once (Parallelism)
  reporter: [['html'], ['list']],  // Reporter to use


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
    // --- 1. SETUP PROJECT ---
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/, // This will look for your auth.setup.js file
    },

    // --- 2. MAIN TESTING PROJECT ---
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
        // Tell this project to use the cookies saved by the setup project
        storageState: STORAGE_STATE
        
      },
      // This ensures the setup runs BEFORE the tests start
      dependencies: ['setup'],
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