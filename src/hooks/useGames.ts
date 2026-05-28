import { useState, useEffect } from 'react';
import type { Game } from '../types';
import { getGames, addGame as addGameToDb, updateGame as updateGameInDb, updateGame } from '../utils/storage';
import { validateGame } from '../utils/gameUtils';

// useState - stores a value that React keeps track of. when it changes, the component re-renders

// useGames owns the full game list and all CRUD operations.
// On mount, fetches all games from Supabase via storage.ts.
// Enforces business rules before saving (e.g. Completed status auto-sets progress to 100).
// Exposes: games, loading, error, addGame, editGame

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // this runs code after the component loads
  // [] means only run this once on first load
  useEffect(() => {
    async function load() {
        // try to get the list of games
        try{
            const data = await getGames();
            setGames(data); // set the list of games with the result
        }
        catch (err){
            setError("Unable to fetch games") // throw an error if you can't get games
        } 
        finally {
            setLoading(false) // this is the setter for the loading state - always runs, success or fail
        }
    }
    load();
  }, []);

  // TODO: validate the incoming game data using validateGame()
  // If invalid, throw an error with the validation message so the form can display it
  // Apply the business rule: if status is 'Completed', force progress to 100
  // Call addGameToDb() and add the returned game to the games state list
  async function addGame(game: Omit<Game, 'id'>): Promise<void> {
    const validatedGame = validateGame(game);
    if(!validatedGame.valid){
        throw new Error(validatedGame.error);
    }
    const gameToSave = game.status === 'Completed' ? { ...game, progress: 100} : game;

    try{
        const newGame = await addGameToDb(gameToSave);
        setGames([...games, newGame]);
    }
    catch (err){
        setError("Failed to add game")
    }
  }

  // TODO: validate the changes using validateGame()
  // If invalid, throw an error with the validation message
  // Apply the business rule: if status is 'Completed', force progress to 100
  // If status changed away from 'Completed', reset progress to 0
  // Call updateGameInDb() and update that game in the games state list
  async function editGame(id: string, changes: Partial<Game>): Promise<void> {
    const validatedChanges = validateGame(changes)
    if(!validatedChanges.valid){
        throw new Error(validatedChanges.error);
    }
    const existingGame = games.find(g => g.id === id);
    let changesToSave = { ...changes };

    if(changes.status === 'Completed'){
        changesToSave.progress = 100;
    }
    else if(existingGame?.status === 'Completed' && changes.status !== undefined){
        changesToSave.progress = 0;
    }
    try{
        const updatedGame = await updateGameInDb(id, changesToSave);
        setGames(games.map( g => g.id === id ? updatedGame : g));
    }
    catch(err){
        setError("Failed to update game");
    }
  }

  return { games, loading, error, addGame, editGame };
}
