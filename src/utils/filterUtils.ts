import type { Game, Status } from '../types';

// filterUtils contains pure functions for filtering, searching, and sorting the game list.
// No side effects — each function takes a game array and returns a new array.
// Used by useFilters to compute the visible game list.

export function filterByStatus(games: Game[], status: Status): Game[] {
    return games.filter((game) => game.status === status);
}

// Searches by title, platform, and genre. Case insensitive. Empty query returns all games.
export function searchGames(games: Game[], query: string): Game[] {
    // .includes("") always returns true so empty query will return all games anyway
    return games.filter((game) => 
        game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.platform.toLowerCase().includes(query.toLowerCase()) || 
        game.genre.toLowerCase().includes(query.toLowerCase())
    );
}

// Sorts by 'title' (A–Z), 'rating' (highest first), or 'progress' (highest first).
// Ties in rating and progress are broken alphabetically by title.
export function sortGames(games: Game[], sortBy: 'title' | 'rating' | 'progress'): Game[] {
    switch (sortBy) {
        case 'title':
            //[...games] creates a brand new array with the same items copied into items
            // so that we are sorting the copy and not the original
            // this is called the spread operator
            return [...games].sort((a,b) => 
                a.title.localeCompare(b.title)
            );
        case 'rating':
            return [...games].sort((a,b) => {
                if(b.rating - a.rating === 0){
                    return a.title.localeCompare(b.title);
                }
                else{
                    return b.rating - a.rating;
                }
            }
        )
        case 'progress':
            return [...games].sort((a,b) => {
                if(b.progress - a.progress === 0){
                    return a.title.localeCompare(b.title);
                }
                else{
                    return b.progress - a.progress;
                }
            }
        )
    }
}
