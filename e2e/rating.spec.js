import { test, expect } from '@playwright/test'

test('un customer puede puntuar un personaje', async ({ page }) => {
  test.setTimeout(120000)

  await page.addInitScript(() => {
    localStorage.setItem('token', 'fake-customer-token')
    localStorage.setItem(
      'user',
      JSON.stringify({
        email: 'user@test.com',
        role: 'customer',
      }),
    )
  })

  await page.goto('/')

  await expect(page.getByText('Disney Characters')).toBeVisible()

  const firstCard = page.locator('article').first()
  await expect(firstCard).toBeVisible({ timeout: 90000 })

  await firstCard.locator('button').filter({ hasText: '☆' }).nth(4).click()

  await expect(firstCard.getByText('⭐')).toBeVisible()
})