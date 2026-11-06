import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByRole('textbox', { name: 'Type your message here...' }).click();
  await page.getByRole('textbox', { name: 'Type your message here...' }).fill('blebla');
  await page.getByRole('button', { name: 'Send' }).click();
});