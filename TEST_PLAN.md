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

Validates a game object before saving. Title is the only required field. All other fields have defaults.

| # | Test case | Expected result |
|---|---|---|
| 1 | Game with only a title provided | Pass — defaults fill in remaining fields |
| 2 | Game with all fields filled out, status Completed and progress 100 | Pass |
| 3 | Game with all fields filled out, status not Completed and progress under 100 | Pass |
| 4 | Empty title | Fail |
| 5 | Title is whitespace only (e.g. `"     "`) | Fail |
| 6 | Negative rating (e.g. `-1`) | Fail |
| 7 | Rating above 5 (e.g. `6`) | Fail |
| 8 | Negative progress (e.g. `-1`) | Fail |
| 9 | Progress above 100 (e.g. `101`) | Fail |
| 10 | Status is Completed and progress is not 100 | Fail |

---