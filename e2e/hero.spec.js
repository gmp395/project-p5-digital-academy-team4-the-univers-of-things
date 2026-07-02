import { test, expect } from '@playwright/test'

test('muestra el hero en la home', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await expect(
    page.getByText('Descubre la magia de cada personaje')
  ).toBeVisible()
})