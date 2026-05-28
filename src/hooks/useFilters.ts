import { useState, useMemo } from 'react';
import type { Game, Status } from '../types';
import { filterByStatus, searchGames, sortGames } from '../utils/filterUtils';

// useFilters manages the active filter, search, and sort state.
// Takes the full game list from useGames and returns a filtered + sorted subset.
// Exposes: filters, setFilters, filteredAndSorted

type SortBy = 'title' | 'rating' | 'progress';

// The shape of all filter/search/sort state in one object
type Filters = {
  status: Status | null;  // null means "show all statuses"
  query: string;          // search input value
  sortBy: SortBy;
};

const defaultFilters: Filters = {
  status: null,
  query: '',
  sortBy: 'title',
};

export function useFilters(games: Game[]) {
    // this is the useState pattern
    // useState always returns two things: The current value, A function to update it
  const [filters, setFilters] = useState<Filters>(defaultFilters);
                                // <Filters> tells TypeScript what type the value is
                                // defaultFilters is the initial value

  const filteredAndSorted = useMemo(() => {
    let result = games;
    if(filters.status){
        result = filterByStatus(result, filters.status);
    }
    if(filters.query){
        result = searchGames(result, filters.query);
    }
    result = sortGames(result, filters.sortBy);

    return result;
  }, [games, filters]);

  return { filters, setFilters, filteredAndSorted };
}
