import { defineConfig, devices } from '@playwright/test';

// BASE_URL defaults to the live site; set BASE_URL=http://localhost:4173/declaration-accessibilite/ for local runs.
export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60000,
  workers: 1,
  retries: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL || 'https://outils.vread.fr/declaration-accessibilite/',
    acceptDownloads: true,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } },
  ],
});
