import dotenv from 'dotenv';
import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

dotenv.config({ path: path.resolve(__dirname, '.env') })


export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {

    baseURL: process.env.KUMKARA_BASE_URL,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers.
     Folders describe the feature; the tier (smoke vs regression) is selected
     with tags, so no test has to move when its tier changes. */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    /* Drives the login flow itself, so it must stay unauthenticated. */
    {
      name: 'public',
      testMatch: '**/auth/**/*.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    /* Every other spec runs against the stored session. */
    {
      name: 'authenticated',
      testMatch: '**/*.spec.ts',
      testIgnore: '**/auth/**',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],
});
