# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: editGame.spec.ts >> Edit Game >> resets progress to 0 and re-enables slider when status changed away from Completed
- Location: tests/playwright/editGame.spec.ts:74:3

# Error details

```
Error: apiRequestContext.delete: getaddrinfo ENOTFOUND uiywvacuvsoixjvoifzt.supabase.co
Call log:
  - → DELETE https://uiywvacuvsoixjvoifzt.supabase.co/rest/v1/games?title=neq.
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.7922.34 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeXd2YWN1dnNvaXhqdm9pZnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MzU5NzYsImV4cCI6MjA5NTIxMTk3Nn0.cWf5poeg0_UmQg3pfVuP7ZChLlTWt1Rj1m6ytHzgB8E
    - Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeXd2YWN1dnNvaXhqdm9pZnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MzU5NzYsImV4cCI6MjA5NTIxMTk3Nn0.cWf5poeg0_UmQg3pfVuP7ZChLlTWt1Rj1m6ytHzgB8E
    - Content-Type: application/json
    - Prefer: return=minimal

```

# Test source

```ts
  1  | import { APIRequestContext, Page } from '@playwright/test';
  2  | 
  3  | export const SUPABASE_URL = 'https://uiywvacuvsoixjvoifzt.supabase.co';
  4  | export const SUPABASE_ANON_KEY =
  5  |   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeXd2YWN1dnNvaXhqdm9pZnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MzU5NzYsImV4cCI6MjA5NTIxMTk3Nn0.cWf5poeg0_UmQg3pfVuP7ZChLlTWt1Rj1m6ytHzgB8E';
  6  | 
  7  | const supabaseHeaders = {
  8  |   apikey: SUPABASE_ANON_KEY,
  9  |   Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  10 |   'Content-Type': 'application/json',
  11 |   Prefer: 'return=minimal',
  12 | };
  13 | 
  14 | export async function clearGames(request: APIRequestContext) {
> 15 |   await request.delete(`${SUPABASE_URL}/rest/v1/games?title=neq.`, {
     |                       ^ Error: apiRequestContext.delete: getaddrinfo ENOTFOUND uiywvacuvsoixjvoifzt.supabase.co
  16 |     headers: supabaseHeaders,
  17 |   });
  18 | }
  19 | 
  20 | export interface GameData {
  21 |   title?: string;
  22 |   platform?: string;
  23 |   genre?: string;
  24 |   status?: string;
  25 |   priority?: string;
  26 |   rating?: number;
  27 |   progress?: number;
  28 | }
  29 | 
  30 | export async function seedGame(request: APIRequestContext, overrides: GameData = {}) {
  31 |   await request.post(`${SUPABASE_URL}/rest/v1/games`, {
  32 |     headers: supabaseHeaders,
  33 |     data: {
  34 |       title: 'Hollow Knight',
  35 |       platform: 'PC',
  36 |       genre: 'Metroidvania',
  37 |       status: 'Playing',
  38 |       priority: 'Low',
  39 |       rating: 1,
  40 |       progress: 50,
  41 |       ...overrides,
  42 |     },
  43 |   });
  44 | }
  45 | 
  46 | /** Sets a range input's value by triggering the native setter (needed for React controlled inputs). */
  47 | export async function moveProgressSlider(page: Page, value: number) {
  48 |   await page.locator('form input[type="range"]').evaluate(
  49 |     (el: HTMLInputElement, val) => {
  50 |       const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  51 |         window.HTMLInputElement.prototype,
  52 |         'value'
  53 |       )!.set!;
  54 |       nativeInputValueSetter.call(el, val);
  55 |       el.dispatchEvent(new Event('input', { bubbles: true }));
  56 |     },
  57 |     value
  58 |   );
  59 | }
  60 | 
  61 | /** Clicks the nth star in the star rating widget (1-indexed). */
  62 | export async function selectStarRating(page: Page, rating: number) {
  63 |   await page.locator(`.star-rating span:nth-child(${rating})`).click();
  64 | }
  65 | 
```