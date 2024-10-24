import { test, expect } from '@playwright/test';

test.describe("App End-To-End Tests", () => {
    test.beforeEach(async ({ page }) => {
    // Navigate to the app's URL
    await page.goto("http://localhost:3001");
  });

  test('should render the app and display the main components', async ({ page }) => {
    // Check if the main heading is visible
    await expect(page.locator('h1')).toHaveText('Query Builder');

    // Check if the submit button is present
    await expect(page.locator('button[role="submit"]')).toBeVisible();

    // Check if the cancel button is present
    await expect(page.locator('button[role="cancel"]')).toHaveText('Cancel');
  });

  test('should add a new rule when "+ Rule" button is clicked', async ({ page }) => {

    // Verify that 1 element is present at start
    await expect(page.getByLabel('Field name')).toBeVisible();

    // Click the "+ Rule" button
    await page.click('button[role="add-field"]');

    // Verify that 2 elements are now present
    const count = await page.getByLabel('Field name').count();

    expect(count).toBe(2);
  });

  test('should add a new group when "+ Group" button is clicked', async ({ page }) => {
    const count1 = await page.getByText('+ Group').count();

    expect(count1).toBe(1);

    // Click the "+ Group" button
    await page.click('button[role="add-group"]');

    const count2 = await page.getByText('+ Group').count();
    
    expect(count2).toBe(2);
  });
});
