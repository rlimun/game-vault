A running log of sessions, decisions, and thinking that went into building this project. This captures the how and why behind the work, not just the what.

## March 26, 2026
- Set up the GitHub repo
- Scaffolded the project with Vite + React + TypeScript
- Created `src/types/index.ts` — the Game interface
- Planned the full architecture across 4 layers: UI, state, data, tests/CI
- Wrote `ARCHITECTURE.md` with the help of Claude
- Wrote `README.md` — clean and portfolio-ready, replaced Vite boilerplate
- Decided to add Supabase instead of localStorage for real database persistence

#### Key Decisions Made
- Supabase over localStorage — I was going to just use localStorage, but thought about showcasing some API and integration tests, so I would need a db
  - I remember a CTO giving me advice during a recruiting call and telling me about the different technologies that he's been experimenting with and he mentioned Supabase
  - I looked up Supabase, and it seemed like a great option to give me a real PostgreSQL database and REST API 
- Custom hooks over Redux — overkill for a single-user app with simple state
- Cypress - because I like Cypress and want to get familiar with it again
- Playwright - because it seems like Playwright is being used across many different companies, so I deciced for both cross-browser and API integration tests — no extra dependency, demonstrates two sides of the tool

## March 30, 2026
- Started the TEST_PLAN.md
  - Started thinking about how I'm going to write out the test plan and things to test and worked with Claude.ai to write it up
  - I summarized what it was we were going to test - from api tests, to integration tests, to frontend tests
  - Added Scope and Objective to TEST_PLAN.md
- Once I started writing about what was in scope, I thought about how to test the relationship between status=completed and the progress bar at 100% and then realized that I don't think I even made a design decision on that

#### Key Decisions Made
- How should the app handle the relationship between status = Completed and progress %?
  - Three options were considered:
    - *Option A — Fully flexible*
      - Completed → progress auto-sets to 100%
      - Progress 100% → status auto-sets to Completed
      - Moving progress off 100% → status reverts to Playing and changing status off Completed → progress resets to 0.
        - Problem: too many rules, feels risky and complicated
    - *Option B — Blocking with confirmation (too heavy):*
       - Completed locks the game card entirely
       - Editing shows a "Are you replaying the game?" modal
          - Problem: Felt heavy for a personal app (an app whose purpose is for practice and to showcase tests)
    - *Decided on — Simple and intentional:*
      - Status set to Completed → Progress auto-locks to 100% and slider is disabled
      - Changing status away from Completed → Progress resets to 0 and slider re-enables
      - Progress slider cannot be manually moved while status is Completed
        - Why: one clear happy path, handles the replay scenario naturally, no confirmation modal needed, easy to test.
- Should I add accessibility into the scope?
  - I decided to put it in there because we can just use axe which already integrates with Cypress and Playwright. I've done accessibility testing before so I figured to add this in here and practice it again
 
## April 7, 2026
- I'm so sad that I've been super busy with work and other life events going on lately that I haven't had time to work on this, but once we get our big release out for work, I think I'll have more time to work on this. 

## May 13, 2026
- I'm back! We finally got our huge release out and then after that, I went on an Asia trip (Japan, Taiwan, Singapore), came back, got used to our time zone again, and I'm ready to get back in the swing of things.
- Yesterday, I worked on adding some jest unit test cases. Today, I'll work on adding more test cases.
- I have been looking at job descriptions and wow, have things progressed. Those job descriptions went from being able to use AI-assisted development to -- autonomous testing, agentic workflows, and MCP servers. I want to try and be on top of the technology so I asked Claude if we could add some of these in the project. Thus, Phase 7 and Phase 8 were added to ARCHITECTURE.md.

## May 19, 2026
- Some changes I made to architecture
  - Simplified duplicate rule from title+platform → title only
  - Landed on the final Completed/progress business rule (one direction only)
  - Decided error messages show inside the modal with form staying open
  - Chose to make rating required instead of defaulting to 3 stars
  - Added title character limit, trimming, manual progress input
- Finished the rest of the test cases
  - What I did was write out all the test cases I could think of and Claude organized it for me
  - I also said some outloud using the audio because I got tired of typing
- Now, I can finally work on building this out!!

## Next
- I integrated Claude into my IDE and gave it this prompt to help me develop this application
```
We're building a Video Game Inventory Manager in React/TypeScript with Supabase. 
Architecture is in ARCHITECTURE.md and tests are in TEST_PLAN.md — read both 
before starting. Today's goal: clean up Vite boilerplate, set up the folder structure,
and create empty files for components, hooks, and utils. Explain everything as we 
write it. Don't write implementation yet — just the scaffold.   
```

## May 20, 2026
- Restored `ARCHITECTURE.md` — it had been accidentally overwritten with `TEST_PLAN.md` content in the last commit. Recovered from git history and updated it with the finalized decisions from May 19.
- Cleaned up Vite boilerplate
  - Replaced `App.tsx` with a minimal shell component
  - Cleared `App.css` — all styles were Vite-specific
  - Stripped `index.css` down to a bare box-sizing reset and base font
- Set up the full folder structure from `ARCHITECTURE.md`
  - Created `src/components/` — `GameCard.tsx`, `GameForm.tsx`, `FilterBar.tsx`, `StatsRow.tsx`
  - Created `src/hooks/` — `useGames.ts`, `useFilters.ts`
  - Created `src/utils/` — `filterUtils.ts`, `gameUtils.ts`, `storage.ts`
  - Created `tests/` with four subdirectories — `unit/`, `e2e/`, `integration/`, `playwright/`
  - Each file has a comment explaining its role and exported function signatures
- Implemented `filterUtils.ts`
  - `filterByStatus` — uses `.filter()` to return only games matching a given status
  - `searchGames` — case-insensitive search across title, platform, and genre using `.includes()`
  - `sortGames` — sorts by title (A–Z), rating (highest first), or progress (highest first); ties broken alphabetically by title using `.sort()` on a copy of the array (`[...games]`) to avoid mutating the original
- Implemented `validateGame` in `gameUtils.ts`
  - Trims title before validating — whitespace-only title treated as empty
  - Checks: title required, title ≤ 100 chars, rating 1–5, progress 0–100, Completed status requires progress = 100
  - Returns a discriminated union type — either `{ valid: true }` or `{ valid: false, error: string }`

#### What I Learned
- `.filter()`, `.sort()`, and the spread operator `[...]` for working with arrays without mutating them
- `Partial<T>` in TypeScript — makes all fields of a type optional, useful for validating partially filled forms
- Discriminated union types — a TypeScript pattern where one field (like `valid`) tells you which shape the object is in
- `import type` — required when importing types with `verbatimModuleSyntax` enabled in TypeScript

## May 24, 2026
- Set up Supabase
  - Created a new Supabase project
  - Created the `games` table using the SQL from `ARCHITECTURE.md`
  - Installed `@supabase/supabase-js`
  - Created `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, added `.env` to `.gitignore`
  - Created `src/lib/supabase.ts` — initializes and exports the Supabase client using `import.meta.env`
- Implemented `storage.ts`
  - `getGames` — fetches all rows from the `games` table with `select('*')`
  - `addGame` — inserts a new game with `insert()`, takes `Omit<Game, 'id'>` since Supabase generates the id
  - `updateGame` — updates an existing game by id with `update().eq('id', id)`, takes `Partial<Game>` since only changed fields are sent (PATCH, not PUT)
  - All functions destructure `{ data, error }` from Supabase, throw on error, and return data
  - Added JSDoc comments to all three functions

#### What I Learned
- `Omit<T, 'key'>` — creates a type with one field removed; used for `addGame` since the id is generated by Supabase
- PATCH vs PUT — PATCH sends only changed fields, PUT replaces the whole object; Supabase's `.update()` is a PATCH
- JSDoc (`/** */`) — documentation format picked up by the IDE to show descriptions and param info on hover
- `import.meta.env` — how Vite exposes `.env` variables to the app at build time
