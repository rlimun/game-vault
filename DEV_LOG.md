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
