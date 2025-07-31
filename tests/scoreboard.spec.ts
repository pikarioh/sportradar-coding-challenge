import { test, expect } from '@playwright/test';

test('has matches', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // Expect Germany to be visible.
  await expect(page.getByRole('heading', { name: "Germany" })).toBeVisible();
});

test('can finish matches early', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // Click the START MATCH button.
  await page.getByTestId("start_match_button").click();

  // Click the FINISH button.
  await page.getByTestId("finish_restart_button").click();

  // Expects to score 9 goals.
  await expect(page.getByTestId('total_score_display')).toContainText('Total Goals: 9');
});

test('scores every 10 seconds', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // Click the START MATCH button.
  await page.getByTestId("start_match_button").click();

  // Wait for the match to complete.
  await page.waitForTimeout(20000); // 90 seconds

  // Expects to score 9 goals.
  await expect(page.getByTestId('total_score_display')).toContainText('Total Goals: 2');
});
