import type { Game } from '../types';

// GameCard displays a single game entry in the vault grid.
// Shows: title, platform, genre, status, priority, rating (stars), and a progress bar.
// Has an Edit button that opens GameForm pre-filled with this game's current values.

type Props = {
  game: Game;
  onEdit: (game: Game) => void; // called when the Edit button is clicked
};

export default function GameCard({ game, onEdit }: Props) {
  // TODO: render the star rating as a string of filled/empty stars
  // Hint: '★'.repeat(game.rating) gives you the filled stars
  //       '☆'.repeat(5 - game.rating) gives you the empty stars
  const stars = '★'.repeat(game.rating) + '☆'.repeat(5 - game.rating);

  return (
    <div className="game-card">
      <h3>{game.title}</h3>

      <p>{game.platform} · {game.genre}</p>
      <p>Status: {game.status}</p>
      <p>Priority: {game.priority}</p>
      <p data-testid="rating">Rating: {stars}</p>

      {/* Progress bar */}
      <div className="progress-bar">
        {/* TODO: set the width style to game.progress as a percentage */}
        <div className="progress-fill" style={{
          width: `${game.progress}%`
        }} />
      </div>
      <p>{game.progress}%</p>

      <button onClick={() => onEdit(game)}>Edit</button>
    </div>
  );
}