// useGames owns the full game list and all CRUD operations.
// On mount, fetches all games from Supabase via storage.ts.
// Enforces business rules before saving (e.g. Completed status auto-sets progress to 100).
// Exposes: games, addGame, editGame

export function useGames() {}
