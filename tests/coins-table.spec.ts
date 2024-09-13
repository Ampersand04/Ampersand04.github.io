import { test, expect } from '@playwright/test'

test.describe('Coins Table - Filtering and Search', () => {
	test('should filter and search for a specific coin', async ({ page }) => {
		await page.goto('/')

		const searchInput = page.locator(
			'input[placeholder="Search by coin name"]'
		)
		await expect(searchInput).toBeVisible()

		await searchInput.fill('Bitcoin')

		const result = page.locator('text=Bitcoin')
		await expect(result).toBeVisible()
	})
})

test.describe('Coins Table - Add and Remove Coins', () => {
	test('should open modal to add coin', async ({ page }) => {
		await page.goto('/')

		const addButton = page.locator('button:text("Add +")').first()
		await expect(addButton).toBeVisible()
		await addButton.click()

		const modal = page.locator('.ant-modal')
		await expect(modal).toBeVisible()

		const input = page.locator('.ant-input-number input')
		await expect(input).toBeVisible()
		await input.fill('5')

		const buyButton = page.locator('button:text("Buy")')
		await expect(buyButton).toBeVisible()
		await buyButton.click()

		await expect(modal).toBeHidden()
	})
})

test.describe('Coins Table - Add and Remove Coins', () => {
	test('should open modal to add coin', async ({ page }) => {
		await page.goto('/')

		const addButton = page.locator('button:text("Add +")').first()
		console.log('Add Button:', await addButton.isVisible())
		await addButton.click()

		const modal = page.locator('.ant-modal')
		console.log('Modal Visible:', await modal.isVisible())
		await expect(modal).toBeVisible()
	})
})

test.describe('Coin Add Modal - Calculation', () => {
	test('should calculate total price correctly', async ({ page }) => {
		await page.goto('/')

		const addButton = page.locator('button:text("Add +")').first()
		await addButton.click()

		const input = page.locator('.ant-input-number input')
		await input.fill('10')

		const price = await page.locator('.price-value').innerText()
		const amount = 10
		const expectedTotal = Number(price) * amount

		const total = page.locator('.total-price')
		await expect(total).toHaveText(`$${expectedTotal.toFixed(2)}`)
	})
})

test.describe('Portfolio - Remove Coin', () => {
	test('should remove coin from portfolio', async ({ page }) => {
		await page.goto('/portfolio')

		const removeButton = page.locator('button:text("Remove")').first()
		await removeButton.click()

		const result = page.locator('text=No coins found')
		await expect(result).toBeVisible()
	})
})
