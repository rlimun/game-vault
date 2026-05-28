import { useState } from 'react';
import type { Game } from './types';
import { useGames } from './hooks/useGames';
import { useFilters } from './hooks/useFilters';
import GameCard from './components/GameCard';
import GameForm from './components/GameForm';
import FilterBar from './components/FilterBar';
import StatsRow from './components/StatsRow';
import './App.css';

// App is the root component. It:
// - owns the modal open/close state for GameForm
// - passes the game list and handlers down to GameCard, FilterBar, and StatsRow
// - wires up useGames and useFilters

export default function App() {
  const { games, loading, error, addGame, editGame } = useGames();
  const { filters, setFilters, filteredAndSorted } = useFilters(games);

  // gameToEdit is null when the modal is closed or when adding a new game
  // gameToEdit is a Game when the Edit button is clicked on a GameCard
  const [gameToEdit, setGameToEdit] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddClick() {
    setGameToEdit(null);      // blank form
    setIsModalOpen(true);
  }

  function handleEditClick(game: Game) {
    setGameToEdit(game);      // pre-filled form
    setIsModalOpen(true);
  }

  function handleClose() {
    setIsModalOpen(false);
    setGameToEdit(null);
  }

  // TODO: implement handleSave
  // This is passed to GameForm as onSave
  // If id is provided, call editGame(id, fields)
  // If no id, call addGame(fields)
  // Let errors bubble up — GameForm catches and displays them
  async function handleSave(fields: Omit<Game, 'id'>, id?: string): Promise<void> {
    if(id){
      await editGame(id, fields);
    }
    else {
      await addGame(fields);
    }
  }

  if (loading) return <p>Loading your vault...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="app">
      <h1>Game Vault</h1>

      <StatsRow games={games} />

      <button onClick={handleAddClick}>+ Add Game</button>

      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Game grid — render one GameCard per filtered/sorted game */}
      <div className="game-grid">
          { filteredAndSorted.map(game => (
              <GameCard key={game.id} game={game} onEdit={handleEditClick} />
          ))}
      </div>

      {/* Modal — only rendered when isModalOpen is true */}
      {isModalOpen && (
        <GameForm
          gameToEdit={gameToEdit}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}