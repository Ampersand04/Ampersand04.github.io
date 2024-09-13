import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: 'tests',
	workers: 1,
	use: {
		baseURL: 'http://localhost:5173',
		launchOptions: {
			headless: true
		}
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
})
