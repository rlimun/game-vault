// storage.ts is the only file that talks to Supabase.
// All HTTP calls go through here — no hook or component calls Supabase directly.
// This keeps the data layer in one place and makes it easy to swap or mock later.
// Functions: getGames (GET), addGame (POST), updateGame (PATCH)

export async function getGames() {}

export async function addGame() {}

export async function updateGame() {}
