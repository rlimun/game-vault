import { test, expect } from '@playwright/test';
import { clearGames, moveProgressSlider, selectStarRating } from './helpers';

test.describe('Add Game', () => {
  test.beforeEach(async ({ page, request }) => {
    await clearGames(request);
    await page.goto('/');
    await page.getByRole('button', { name: '+ Add Game' }).click();
  });

  test('adds a game with all fields filled out', async ({ page }) => {
    const rating = 4;
    const expectedStars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    await page.getByLabel('Title').fill('Final Fantasy VII: Remake');
    await page.getByLabel('Platform').fill('PS4');
    await page.getByLabel('Genre').fill('RPG');
    await page.getByLabel('Status').selectOption('Playing');
    await page.getByLabel('Priority').selectOption('High');
    await selectStarRating(page, rating);
    await moveProgressSlider(page, 75);
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('.modal')).not.toBeVisible();

    const card = page.locator('.game-card', { hasText: 'Final Fantasy VII: Remake' });
    await expect(card).toBeVisible();
    await expect(card.getByText('PS4')).toBeVisible();
    await expect(card.getByText('RPG')).toBeVisible();
    await expect(card.getByText('Playing')).toBeVisible();
    await expect(card.getByText('High')).toBeVisible();
    await expect(card.getByTestId('rating')).toHaveText(`Rating: ${expectedStars}`);
    await expect(card.locator('.progress-fill')).toHaveAttribute('style', 'width: 75%;');
  });

  test('shows error when saving without a title', async ({ page }) => {
    await page.getByLabel('Platform').fill('PS4');
    await page.getByLabel('Genre').fill('RPG');
    await page.getByLabel('Status').selectOption('Playing');
    await page.getByLabel('Priority').selectOption('High');
    await selectStarRating(page, 4);
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('.error', { hasText: 'Title is required.' })).toBeVisible();
  });

  test('shows error when saving without a rating', async ({ page }) => {
    await page.getByLabel('Title').fill('Test');
    await page.getByLabel('Platform').fill('PS4');
    await page.getByLabel('Genre').fill('RPG');
    await page.getByLabel('Status').selectOption('Playing');
    await page.getByLabel('Priority').selectOption('High');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.locator('.error', { hasText: 'Rating must be between 1 and 5.' })).toBeVisible();
  });

  test('closes the form without adding when Cancel is clicked', async ({ page }) => {
    await page.getByLabel('Title').fill('Hollow Knight');
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.locator('.modal')).not.toBeVisible();
    await expect(page.locator('body')).not.toContainText('Hollow Knight');
  });
});
