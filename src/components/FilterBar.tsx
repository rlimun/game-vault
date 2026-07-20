import type { Status } from '../types';

// FilterBar renders the controls for filtering, searching, and sorting the game list.
// Controls: status dropdown, search input, sort dropdown.
// Calls setFilters from useFilters when any control changes.

type SortBy = 'title' | 'rating' | 'progress';

type Filters = {
  status: Status | null;
  query: string;
  sortBy: SortBy;
};

type Props = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

export default function FilterBar({ filters, setFilters }: Props) {
  return (
    <div className="filter-bar">

      {/* Search input — update query on every keystroke */}
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search by title, platform, or genre"
        value={filters.query}
        onChange={(e) => setFilters({ ...filters, query: e.target.value })}
      />

      {/* Status filter dropdown — null means "all statuses" */}
      <select
        data-testid="status-filter"
        value={filters.status ?? ''}
        onChange={(e) => {
          // TODO: call setFilters with the updated status
          // if e.target.value is '' set status to null, otherwise cast to Status
          if(e.target.value === ''){
            setFilters({...filters, status: null})
          }
          else{
            setFilters({...filters, status: e.target.value as Status }) // as Status is a Typescript cast telling Typescript - this string is a valid Status
          }
        }}
      >
        <option value="">All Statuses</option>
        <option value="Playing">Playing</option>
        <option value="Completed">Completed</option>
        <option value="Backlog">Backlog</option>
        <option value="Dropped">Dropped</option>
      </select>

      {/* Sort dropdown */}
      <select
        value={filters.sortBy}
        onChange={(e) => {
          // TODO: call setFilters with the updated sortBy
          // cast e.target.value to SortBy
          setFilters({...filters, sortBy: e.target.value as SortBy })
        }}
      >
        <option value="title">Sort: Title (A–Z)</option>
        <option value="rating">Sort: Rating</option>
        <option value="progress">Sort: Progress</option>
      </select>

    </div>
  );
}