import { test, expect } from '@playwright/test'

test('al clicar una tarjeta se abre el detalle del personaje', async ({ page }) => {
  test.setTimeout(120000)

  await page.goto('/')

  await expect(page.getByText('Disney Characters')).toBeVisible()

  const firstCard = page.locator('article').first()
  await expect(firstCard).toBeVisible({ timeout: 90000 })

  await firstCard.click()

  await expect(page).toHaveURL(/\/character\/\d+/)
  await expect(page.getByText('Volver')).toBeVisible()
})