# TEST_PLAN.md

## 1. Objectives

The goal of testing this app is to make sure all functionality works seamlessly
and doesn't break. We will be testing across four layers:

- **Playwright API tests** — verify that Supabase endpoints respond correctly
  to GET, POST, and PATCH requests
- **Playwright integration tests** — verify that data flows correctly from the
  UI to the database and back to the UI. If we save a game, we want to confirm
  the API call was made and the data was persisted. The next time the app loads,
  we want to confirm that data is retrieved from the database and renders
  correctly in the UI
- **Cypress E2E tests** — verify that all frontend user flows work correctly
- **Jest unit tests** — verify that pure utility functions return the correct
  output

---

## 2. Scope

### In scope

**Frontend functionality:**
- Adding a game to the vault
- Editing all game fields — title, platform, genre, status, priority, rating,
  and progress
- Filtering by status and priority
- Sorting by rating and progress
- Searching by title, platform, and genre
- Displaying all fields correctly in a GameCard

**Business rule:**
- Setting status to Completed auto-locks progress to 100% and disables
  the progress slider
- Changing status away from Completed resets progress to 0 and re-enables
  the progress slider
- Progress slider cannot be manually moved while status is Completed

**API and data persistence:**
- Verifying GET, POST, and PATCH calls to Supabase respond correctly
- Verifying that saved data persists in the database and renders in the UI
  on next load

**Accessibility:**
- Basic accessibility testing using axe, integrated into Cypress and Playwright.
  axe was chosen because it integrates directly with our existing test tools
  and runs automatically as part of the CI pipeline — no separate manual
  testing process needed

**Error handling:**
- Basic error handling — verifying the app displays an appropriate error
  message when an API call to Supabase fails

**Browsers:**
- Chrome (via Playwright Chromium)
- Safari (via Playwright WebKit)

---

## 3. Out of Scope

| Item | Reason |
|---|---|
| Delete functionality | Keeping the project focused — descoping deletion for now, can be added in a future iteration |
| Multiple users and authentication | Simple app being used by one person — multiple user support is not needed |
| Performance and load testing | Not relevant for a simple personal app used by one person |
| Mobile testing | Descoping for now, this is a desktop web app — may add later |
| Responsive design testing | Since we are only testing on desktop, responsive design testing is not needed |
| Firefox, Edge, and other browsers | Covering the two most popular browsers — Chrome and Safari — and descoping the rest |

---

## 4. Jest Unit Test Cases

Unit tests cover pure utility functions in `utils/`. Each test calls a function with known input and verifies the output is exactly what's expected. No browser, no UI, no network — just input in, output out.

---

### 4.1 `filterByStatus(games, status)`

Filters a list of games by a given status.

| # | Test case | Expected result |
|---|---|---|
| 1 | List of games, filter by `Playing` | Returns only games with status Playing |
| 2 | List of games, filter by `Completed` | Returns only games with status Completed |
| 3 | List of games, filter by `Backlog` | Returns only games with status Backlog |
| 4 | List of games, filter by `Dropped` | Returns only games with status Dropped |
| 5 | Multiple games share the same status | Returns ALL matching games, not just the first |
| 6 | No games match the given status | Returns empty array |
| 7 | Empty game list | Returns empty array |

---

### 4.2 `searchGames(games, query)`

Searches games by title, platform, or genre.

| # | Test case | Expected result |
|---|---|---|
| 1 | Search by full title | Returns all games with that title |
| 2 | Search by partial title (e.g. "Suikoden" matches "Suikoden I", "Suikoden II", "Suikoden III") | Returns all games containing that string |
| 3 | Search by full platform | Returns all games on that platform |
| 4 | Search by full genre | Returns all games in that genre |
| 5 | Search is case insensitive (e.g. "hollow knight" matches "Hollow Knight") | Returns matching games regardless of casing |
| 6 | Search with spaces, numbers, and special characters in query | Returns correct matches |
| 7 | Search with no matches across title, platform, and genre | Returns empty array |
| 8 | Empty query string | Returns all games |
| 9 | Empty game list | Returns empty array |

---

### 4.3 `sortGames(games, sortBy)`

Sorts a list of games by a given field. Ties are broken alphabetically by full title.

| # | Test case | Expected result |
|---|---|---|
| 1 | Sort by `title` | Returns games in A–Z alphabetical order by full title |
| 2 | Sort by `rating` | Returns games highest rating first, lowest last |
| 3 | Sort by `progress` | Returns games highest progress first, lowest last |
| 4 | Multiple games with the same rating | Tied games sort alphabetically by full title |
| 5 | Multiple games with the same progress | Tied games sort alphabetically by full title |
| 6 | Empty game list, sort by `title` | Returns empty array |
| 7 | Empty game list, sort by `rating` | Returns empty array |
| 8 | Empty game list, sort by `progress` | Returns empty array |

---

### 4.4 `validateGame(game)`

Validates a game object before saving. Title is the only required field. Rating is required (1–5). All other fields have defaults.

| # | Test case | Expected result |
|---|---|---|
| 1 | Game with only a title and rating provided | Pass — defaults fill in remaining fields |
| 2 | Game with all fields filled out, status Completed and progress 100 | Pass |
| 3 | Game with all fields filled out, status not Completed and progress under 100 | Pass |
| 4 | Title at exactly 100 characters | Pass |
| 5 | Empty title | Fail |
| 6 | Title is whitespace only (e.g. `"     "`) | Fail — treated as empty |
| 7 | Title with leading/trailing spaces (e.g. `"  Hollow Knight  "`) | Pass — saved as `"Hollow Knight"` after trimming |
| 8 | Title exceeds 100 characters | Fail |
| 9 | No rating selected (rating = 0) | Fail — rating is required |
| 10 | Negative rating (e.g. `-1`) | Fail |
| 11 | Rating above 5 (e.g. `6`) | Fail |
| 12 | Negative progress (e.g. `-1`) | Fail |
| 13 | Progress above 100 (e.g. `101`) | Fail |
| 14 | Status is Completed and progress is not 100 | Fail |
| 15 | Progress typed manually as a number within 0–100 | Pass |
| 16 | Progress set to 100 manually while status is not Completed | Pass — status does NOT auto-change to Completed |

---
## 5. Cypress E2E Test Cases

E2E tests simulate real user flows in a real browser. These tests verify that the full user experience works correctly — clicking, typing, submitting forms, and seeing results on screen.

---

### 5.1 Add game flow

| # | Scenario | What Cypress verifies |
|---|---|---|
| 1 | Fill out all fields and save | Game appears in list, GameCard displays all entered values correctly |
| 2 | Fill out title and rating only, save | Game appears in list, GameCard shows title, rating, and all default values |
| 3 | Set status to Completed in form | Progress shows 100%, progress slider is disabled |
| 4 | Save without a title | Error appears, game is NOT added to the list |
| 5 | Fix title after error and save | Error clears, game is added to the list |
| 6 | Save without selecting a rating | Error appears, game is NOT added to the list |
| 7 | Add a game with the same title as an existing game | Error appears, game is NOT added to the list |
| 8 | Set progress to 100% manually while status is not Completed | Status does NOT auto-change to Completed |
| 9 | Title with leading/trailing spaces | Game saved with spaces trimmed, GameCard shows trimmed title |
| 10 | Title at 101 characters | Error appears, game is NOT added to the list |
| 11 | Open Add form and click Cancel | Form closes, game list is unchanged |
| 12 | Fill out entire form then click Cancel | Form closes, no game is added to the list |
| 13 | Close Add form and reopen it | Form opens blank — no previously entered values |
| 14 | Force GET to fail on app load | Main screen shows "Failed to fetch games. Please refresh the page to try again." |
| 15 | Force POST to fail on save | Error appears inside form modal — "Failed to save your game, please try again." Form stays open, data preserved |
| 16 | Force PATCH to fail on edit save | Error appears inside form modal — "Failed to update your game, please try again." Form stays open, data preserved |

---
### 5.2 Edit game flow

| # | Scenario | What Cypress verifies |
|---|---|---|
| 1 | Click edit on a GameCard — form opens pre-filled | All current values are populated in the form correctly |
| 2 | Edit all fields and save | GameCard updates to show all new values |
| 3 | Edit title only and save | GameCard shows updated title, all other fields unchanged |
| 4 | Change status to Completed | Progress auto-sets to 100%, slider is disabled |
| 5 | Change status away from Completed | Progress resets to 0, slider re-enables |
| 6 | Edit title to match an existing game's title | Error appears, edit is NOT saved |
| 7 | Edit title to match existing title — different casing | Error appears — duplicate check is case-insensitive |
| 8 | Edit title and clear it entirely | Error appears, edit is NOT saved |
| 9 | Edit title to exceed 100 characters | Error appears, edit is NOT saved |
| 10 | Edit title with leading/trailing spaces | Saved with spaces trimmed |
| 11 | Edit progress by typing a number manually | Progress updates correctly if value is 0–100 |
| 12 | Click Cancel without making changes | Form closes, GameCard is unchanged |
| 13 | Make changes then click Cancel | Form closes, GameCard shows original values |
| 14 | Force PATCH to fail on save | Error appears inside form modal — "Failed to update your game, please try again." Form stays open, data preserved |
| 15 | Retry after PATCH failure | On success, form closes, GameCard shows updated values |

---

### 5.3 Filter flow

| # | Scenario | What Cypress verifies |
|---|---|---|
| 1 | Filter by status "Playing" | Only Playing games are visible |
| 2 | Filter by status "Completed" | Only Completed games are visible |
| 3 | Filter by status "Backlog" | Only Backlog games are visible |
| 4 | Filter by status "Dropped" | Only Dropped games are visible |
| 5 | Filter by priority "High" | Only High priority games are visible |
| 6 | Filter by priority "Medium" | Only Medium priority games are visible |
| 7 | Filter by priority "Low" | Only Low priority games are visible |
| 8 | Filter by status with no matching games | Empty state shown, no GameCards visible |
| 9 | Filter by status then clear filter | All games are visible again |
| 10 | Filter by status AND priority combined | Only games matching both filters are visible |

---

### 5.4 Search flow

| # | Scenario | What Cypress verifies |
|---|---|---|
| 1 | Search by full title | Only matching games are visible |
| 2 | Search by partial title | All games containing that string are visible |
| 3 | Search by platform | Only games on that platform are visible |
| 4 | Search by genre | Only games in that genre are visible |
| 5 | Search is case insensitive | Matching games appear regardless of casing |
| 6 | Search with no matches | Empty state shown, no GameCards visible |
| 7 | Clear search query | All games are visible again |
| 8 | Search while a filter is active | Results respect both search query and active filter |

---

### 5.5 Sort flow

| # | Scenario | What Cypress verifies |
|---|---|---|
| 1 | Sort by title A–Z | Games appear in alphabetical order |
| 2 | Sort by rating (highest first) | Games appear with highest rating at top |
| 3 | Sort by progress (highest first) | Games appear with highest progress at top |
| 4 | Sort while a filter is active | Sorted results respect the active filter |
| 5 | Sort while search is active | Sorted results respect the active search query |

---

### 5.6 Stats row

| # | Scenario | What Cypress verifies |
|---|---|---|
| 1 | App loads with games | Stats row shows correct total, playing, completed, backlog counts |
| 2 | Add a new game | Stats row updates to reflect new counts |
| 3 | Edit a game's status | Stats row updates to reflect new counts |

---

### 5.7 Accessibility

| # | Scenario | What Cypress verifies |
|---|---|---|
| 1 | Run axe on main page | No accessibility violations detected |
| 2 | Run axe on Add game form | No accessibility violations detected |
| 3 | Run axe on Edit game form | No accessibility violations detected |

---

## 6. Playwright API Test Cases

API tests hit Supabase endpoints directly — no browser, no UI. They verify that the REST API behaves correctly for each operation.

---

### 6.1 GET /games

| # | Test case | Expected result |
|---|---|---|
| 1 | Fetch all games | Returns 200 with array of game objects |
| 2 | Fetch games when table is empty | Returns 200 with empty array |
| 3 | Each game object has all required fields | id, title, platform, genre, status, rating, priority, progress all present |

---

### 6.2 POST /games

| # | Test case | Expected result |
|---|---|---|
| 1 | Create a valid game with all fields | Returns 201, game appears in subsequent GET |
| 2 | Create a game with title and rating only | Returns 201, defaults applied to other fields |
| 3 | Create a game with a duplicate title | Returns error response, game NOT created |
| 4 | Create a game with missing title | Returns error response, game NOT created |
| 5 | Create a game with missing rating | Returns error response, game NOT created |
| 6 | Create a game with progress > 100 | Returns error response |
| 7 | Create a game with negative rating | Returns error response |

---

### 6.3 PATCH /games

| # | Test case | Expected result |
|---|---|---|
| 1 | Update a game's title | Returns 200, updated title appears in subsequent GET |
| 2 | Update a game's status to Completed | Returns 200, progress is 100 in response |
| 3 | Update a game's status away from Completed | Returns 200, progress is 0 in response |
| 4 | Update a game's title to match an existing game | Returns error response, update NOT applied |
| 5 | Update a game with an invalid game ID | Returns 404 or error response |
| 6 | Update progress to a value > 100 | Returns error response |

---

## 7. Playwright Cross-Browser Test Cases

These tests run the same critical user flows across Chrome (Chromium) and Safari (WebKit) to verify consistent behavior across browsers.

| # | Scenario | Browsers |
|---|---|---|
| 1 | App loads and displays game list | Chrome, Safari |
| 2 | Add a game — full happy path | Chrome, Safari |
| 3 | Edit a game — full happy path | Chrome, Safari |
| 4 | Filter by status | Chrome, Safari |
| 5 | Search by title | Chrome, Safari |
| 6 | Sort by rating | Chrome, Safari |
| 7 | Business rule — Completed locks progress | Chrome, Safari |
| 8 | Validation — missing title shows error | Chrome, Safari |
| 9 | Error handling — GET failure shows error message | Chrome, Safari |

---

## 8. CI/CD Pipeline

GitHub Actions runs the full test suite automatically on every push and pull request.

### Pipeline steps (in order)

1. Install dependencies — `npm install`
2. Run Jest unit tests — `npm run test:unit`
3. Run Cypress E2E tests — `npm run test:e2e`
4. Run Playwright API and cross-browser tests — `npm run test:playwright`

If any step fails, the pipeline stops and the push is blocked. All test results are reported in the GitHub Actions dashboard.

### What this demonstrates

- Tests run automatically — no manual trigger needed
- Every push is verified before it can be merged
- Three test layers run in sequence — unit first (fastest), E2E second, cross-browser/API last
- A failing test is caught before it reaches production