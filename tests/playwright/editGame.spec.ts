import { test, expect } from '@playwright/test';
import { clearGames, seedGame, moveProgressSlider, selectStarRating } from './helpers';

const initial = {
  title: 'Hollow Knight',
  platform: 'PC',
  genre: 'Metroidvania',
  status: 'Playing',
  priority: 'Low',
  rating: 1,
  progress: 50,
};

test.describe('Edit Game', () => {
  test.beforeEach(async ({ page, request }) => {
    await clearGames(request);
    await seedGame(request);
    await page.goto('/');
    await page.getByRole('button', { name: 'Edit' }).click();
  });

  test('opens edit form pre-filled with current game values', async ({ page }) => {
    const modal = page.locator('.modal');
    await expect(modal.locator('h2')).toHaveText('Edit Game');
    await expect(modal.getByLabel('Platform')).toHaveValue('PC');
    await expect(modal.getByLabel('Status')).toHaveValue('Playing');
  });

  test('updates all fields when saved', async ({ page }) => {
    const newTitle = 'New Title';
    const newPlatform = 'New Platform';
    const newGenre = 'New Genre';
    const newStatus = 'Dropped';
    const newPriority = 'High';
    const newStarRating = 5;
    const expectedStars = '★'.repeat(newStarRating) + '☆'.repeat(5 - newStarRating);
    const newProgressPercentage = 90;
    const gameModal = page.locator('.modal');

    await gameModal.getByLabel('Title').fill(newTitle);
    await gameModal.getByLabel('Platform').fill(newPlatform);
    await gameModal.getByLabel('Genre').fill(newGenre);
    await gameModal.getByLabel('Status').selectOption(newStatus);
    await gameModal.getByLabel('Priority').selectOption(newPriority);
    await selectStarRating(page, newStarRating);
    await moveProgressSlider(page, newProgressPercentage);
    await gameModal.getByRole('button', { name: 'Save'}).click();

    const card = page.locator('.game-card', { hasText: newTitle });
    await expect(card).toBeVisible();
    await expect(card.getByText(newPlatform)).toBeVisible();
    await expect(card.getByText(newGenre)).toBeVisible();
    await expect(card.getByText(newStatus)).toBeVisible();
    await expect(card.getByText(newPriority)).toBeVisible();
    await expect(card.getByTestId('rating')).toHaveText(`Rating: ${expectedStars}`);
    await expect(card.locator('.progress-fill')).toHaveAttribute('style', `width: ${newProgressPercentage}%;`);

    // TODO: clear and retype each field with new values

    // TODO: select a new star rating and progress
    // TODO: save and verify the game card shows the updated values
  });

  test('updates title only, other fields remain the same', async ({ page }) => {
    // TODO: clear title and type a new one, save
    // TODO: verify the card shows the new title but all other original values
  });

  test('auto-sets progress to 100 and disables slider when status changed to Completed', async ({ page }) => {
    // TODO: select 'Completed' from the Status dropdown
    // TODO: assert slider value is '100' and slider is disabled
  });

  test('resets progress to 0 and re-enables slider when status changed away from Completed', async ({ page }) => {
    // TODO: select 'Completed', then select 'Playing'
    // TODO: assert slider value is '0' and slider is not disabled
  });

  test('closes form without saving when Cancel is clicked', async ({ page }) => {
    // TODO: click Cancel
    // TODO: assert modal is not visible
    // TODO: assert game card still shows the original values
  });
});
