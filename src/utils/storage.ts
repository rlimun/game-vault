// storage.ts is the only file that talks to Supabase.
// All HTTP calls go through here — no hook or component calls Supabase directly.
// This keeps the data layer in one place and makes it easy to swap or mock later.
// Functions: getGames (GET), addGame (POST), updateGame (PATCH)
import type { Game } from '../types';
import { supabase } from "../lib/supabase";

/**
 * Fetches all games from the Supabase games table
 * Called once on app load by useGames. 
 * Throws error if the request fails os useGames can handle the error and show a message
 * @returns data - the full game list
 */
export async function getGames() {
    const { data, error } = await supabase.from('games').select('*');
    if (error) throw error;
    return data;
}

/**
 * Inserts a new game into the database. Takes a game without an id and Supabase generates the id automatically
 * @param {Omit<Game, 'id'>} game - The new game to insert, without an id
 * @returns {Promise<Game>} The created game including SUpabase-generated id
 */
export async function addGame(game: Omit<Game, 'id'>) {
    const { data, error } = await supabase.from('games').insert(game).select().single();
    if (error) throw error;
    return data;
}

/**
 * Update an existing game by id. Takes only the fields being changed (Partial<Game>)
 * rather than the full object - this is a PATCH, not a PUT, so only changed fields are sent
 * @param {string} id - The id of the game to update
 * @param {Partial<Game>} changes - The fields to update on the game
 * @returns {Promise<Game>} The updated game with all current field values
 */
export async function updateGame(id: string, changes: Partial<Game>) {
    const { data, error } = await supabase.from('games').update(changes).eq('id', id).select().single();
    if (error) throw error;
    return data;
}
