import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	testMatch: ['**/*.test.ts'],
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://172.17.0.3:5174',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure'
	},
	webServer: {
		command: 'npm run dev',
		url: 'http://172.17.0.3:5174',
		reuseExistingServer: !process.env.CI,
		timeout: 120000
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'visual-tests',
			testMatch: /visual\/.*\.spec\.ts/,
			use: {
				...devices['Desktop Chrome'],
				viewport: { width: 1280, height: 720 },
				screenshot: 'on',
				video: 'on-first-retry'
			}
		}
	]
});
