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
- 
