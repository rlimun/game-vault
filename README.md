# Game Vault

> I built this project to practice skills I use professionally, learn new ones
> I'd been meaning to dig into, and create something I could actually show.
> It covers the full stack: a React/TypeScript frontend, a real PostgreSQL
> database via Supabase, and a complete testing pyramid with Jest,
> Cypress, and Playwright running on every push via GitHub Actions.
> Check out DEV_LOG.md for updates and progress

Track your backlog, currently playing, and completed games.

Built with React and TypeScript, backed by a real PostgreSQL database via Supabase, and covered by a full testing pyramid — unit tests, E2E tests, API integration tests, and cross-browser tests — running automatically on every push via GitHub Actions.

---

## Features

- Add, edit, and delete games from your inventory
- Track status — Playing, Completed, Backlog, or Dropped
- Rate games 1–5 stars
- Track progress percentage — auto-sets to 100% when marked Completed
- Set priority — High, Medium, or Low
- Filter by status and priority
- Search by title, platform, or genre
- Sort by title, rating, or progress
- Data persists in a real database — available across devices and browsers

---

## Tech Stack

| Layer | Tool |
|---|---|
| UI | React 18 + TypeScript |
| Build | Vite |
| Database + API | Supabase (PostgreSQL) |
| Unit tests | Jest |
| E2E tests | Cypress |
| Cross-browser + API tests | Playwright |
| CI/CD | GitHub Actions |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Supabase](https://supabase.com) account

### 1. Clone the repo

```bash
git clone https://github.com/rlimun/video-game-inventory.git
cd video-game-inventory
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

Create a new project in Supabase, then run the following SQL in the Supabase SQL editor to create the games table:

```sql
create table games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  platform text not null,
  genre text not null,
  status text not null,
  rating integer not null default 0,
  priority text not null,
  progress integer not null default 0
);
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these in your Supabase project under Settings → API.

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Running Tests

### Unit tests (Jest)

```bash
npm run test:unit
```

Tests pure utility functions — filtering, sorting, validation.

### E2E tests (Cypress)

```bash
npm run test:e2e
```

Tests full user flows — add, edit, delete, filter, search.

### Cross-browser + API tests (Playwright)

```bash
npm run test:playwright
```

Runs E2E flows across Chrome, Firefox, and WebKit. Also runs API integration tests against Supabase endpoints.

### All tests

```bash
npm run test
```

---

## CI/CD

GitHub Actions runs the full test suite on every push and pull request. See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for the pipeline configuration.

---

## Project Structure

```
src/
├── components/     # UI components
├── hooks/          # Custom React hooks (state + logic)
├── types/          # TypeScript types and interfaces
├── utils/          # Pure utility functions
└── App.tsx

tests/
├── unit/           # Jest unit tests
├── e2e/            # Cypress E2E tests
├── integration/    # Playwright API integration tests
└── playwright/     # Playwright cross-browser tests
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for a full breakdown of design decisions.
See [TEST_PLAN.md](TEST_PLAN.md) for the testing strategy and coverage.

---

## Development Process

Built using Claude as an AI pair programmer. Claude drafted the initial 
architecture, explained concepts, and helped generate boilerplate and write 
documentation — but I questioned a lot, changed a lot, and made all the real 
decisions along the way. The Supabase integration, the testing strategy, the scope, 
the structure — those came out of back-and-forth, not copy-paste. All tests and code are 
to be written by me. I wanted to use AI the way I would in a professional setting — 
as a tool that speeds things up, not one that does the everything for you.

---

## Author

Richelle Limun — [richellelimun@gmail.com](mailto:richellelimun@gmail.com) · [@rlimun](https://github.com/rlimun)
