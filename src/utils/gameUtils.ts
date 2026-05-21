import type { Game } from '../types';

// gameUtils contains pure utility functions for game data.

// this is called a union type so ValidationResult is either
// valid:true or
// valid:false, error:string
type ValidationResult =
  | { valid: true }
  | { valid: false; error: string };

// Validates a game object before saving.
// Title and rating (1–5) are required. All other fields have defaults.
// Trims title before validating — a whitespace-only title is treated as empty.
export function validateGame(game: Partial<Game>): ValidationResult {
  if(!game.title){
    return { valid: false, error: 'Title is required.'};
  }
  let trimmedTitle = game.title.trim();
  if(trimmedTitle === ''){
    return { valid: false, error: 'Title contains only whitespaces.'};
  }
  if(trimmedTitle.length > 100){
    return { valid: false, error: 'Title is too long.'};
  }
  if(game.rating === undefined || game.rating < 1 || game.rating > 5){
    return { valid: false, error: 'Rating must be between 1 and 5.'}
  }
  if(game.progress === undefined || game.progress > 100 || game.progress < 0){
    return { valid: false, error: 'Game progress must be between 0 and 100.'};
  }
  // don't need to check if game status is undefined because if it's undefined then
  // game.status === Completed is false and so we don't get here and will just return valid:true
  // and also if the games status is undefined then that just means when haven't picked a status yet
  if(game.status === 'Completed' && game.progress !== 100){
    return { valid: false, error: 'Status should not be completed if progress is not 100.'};
  }
  return { valid: true };
}
