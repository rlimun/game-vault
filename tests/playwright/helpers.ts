import { APIRequestContext, Page } from '@playwright/test';

export const SUPABASE_URL = 'https://uiywvacuvsoixjvoifzt.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeXd2YWN1dnNvaXhqdm9pZnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MzU5NzYsImV4cCI6MjA5NTIxMTk3Nn0.cWf5poeg0_UmQg3pfVuP7ZChLlTWt1Rj1m6ytHzgB8E';

const supabaseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
};

export async function clearGames(request: APIRequestContext) {
  await request.delete(`${SUPABASE_URL}/rest/v1/games?title=neq.`, {
    headers: supabaseHeaders,
  });
}

export interface GameData {
  title?: string;
  platform?: string;
  genre?: string;
  status?: string;
  priority?: string;
  rating?: number;
  progress?: number;
}

export async function seedGame(request: APIRequestContext, overrides: GameData = {}) {
  await request.post(`${SUPABASE_URL}/rest/v1/games`, {
    headers: supabaseHeaders,
    data: {
      title: 'Hollow Knight',
      platform: 'PC',
      genre: 'Metroidvania',
      status: 'Playing',
      priority: 'Low',
      rating: 1,
      progress: 50,
      ...overrides,
    },
  });
}

/** Sets a range input's value by triggering the native setter (needed for React controlled inputs). */
export async function moveProgressSlider(page: Page, value: number) {
  await page.locator('form input[type="range"]').evaluate(
    (el: HTMLInputElement, val) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )!.set!;
      nativeInputValueSetter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    },
    value
  );
}

/** Clicks the nth star in the star rating widget (1-indexed). */
export async function selectStarRating(page: Page, rating: number) {
  await page.locator(`.star-rating span:nth-child(${rating})`).click();
}
