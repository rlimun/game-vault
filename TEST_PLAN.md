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
