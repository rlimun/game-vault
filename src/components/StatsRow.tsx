import type { Game } from '../types';

// StatsRow displays aggregate counts across the full game list (unfiltered).
// Shows: total games, currently playing, completed, and in backlog.
// Updates automatically whenever the game list changes.

type Props = {
  games: Game[];
};

export default function StatsRow({ games }: Props) {
  // TODO: compute these four counts from the games array
  const total = games.length;
  const playing = games.filter(g => g.status === 'Playing').length;
  const completed = games.filter(g => g.status === 'Completed').length;
  const backlog = games.filter(g => g.status === 'Backlog').length;

  return (
    <div className="stats-row">
      <span>Total: {total}</span>
      <span>Playing: {playing}</span>
      <span>Completed: {completed}</span>
      <span>Backlog: {backlog}</span>
    </div>
  );
}
