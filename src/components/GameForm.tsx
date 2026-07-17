import { useState, useEffect } from 'react';
import type { Game, Status, Priority } from '../types';

// GameForm is a modal form used for both adding and editing a game.
// Fields: title, platform, genre, status, priority, rating (stars), progress (slider + manual input).
// UI rule: when status is Completed, progress is locked at 100 and the slider is disabled.
// On save, calls addGame or editGame from useGames. On cancel, closes without saving.

type Props = {
  // If gameToEdit is provided, the form is in edit mode (pre-filled).
  // If null, the form is in add mode (blank).
  gameToEdit: Game | null;
  onSave: (game: Omit<Game, 'id'>, id?: string) => Promise<void>;
  onClose: () => void;
};

const emptyForm = {
  title: '',
  platform: '',
  genre: '',
  status: 'Backlog' as Status,
  priority: 'Medium' as Priority,
  rating: 0,
  progress: 0,
};

export default function GameForm({ gameToEdit, onSave, onClose }: Props) {
  const [fields, setFields] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);

  // When gameToEdit changes, either pre-fill the form (edit mode) or reset it (add mode)
  useEffect(() => {
    if (gameToEdit) {
      setFields({
        title: gameToEdit.title,
        platform: gameToEdit.platform,
        genre: gameToEdit.genre,
        status: gameToEdit.status,
        priority: gameToEdit.priority,
        rating: gameToEdit.rating,
        progress: gameToEdit.progress,
      });
    } else {
      setFields(emptyForm);
    }
  }, [gameToEdit]);

  // TODO: handle form submission
  // 1. If status is Completed, set progress to 100 before saving
  // 2. Call onSave — pass fields and gameToEdit.id if editing
  // 3. If onSave throws, catch the error and show it with setError
  // 4. If onSave succeeds, call onClose to close the modal
  async function handleSubmit(e: React.FormEvent) {
    // e is the event
    e.preventDefault(); // prevents the browser from reloading the page on form submit
    setError(null);

    const progress = fields.status === 'Completed' ? 100 : fields.progress;
    // the new/updated field values the user just typed into the form
    const gameData = { ...fields, progress };

    try{
      // gameToEdit?.id -> if gameToEdit exists, give me id, else if it's null give me undefined
      await onSave(gameData, gameToEdit?.id);
      onClose();
    }
    catch(err){
      setError(err instanceof Error ? err.message: 'Faild to save game');
    }
  }

  // TODO: handle star rating click
  // When a star is clicked, update fields.rating to the clicked star's value (1–5)
  function handleStarClick(value: number) {
    setFields({...fields, rating: value });
  }

  const isCompleted = fields.status === 'Completed';

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{gameToEdit ? 'Edit Game' : 'Add Game'}</h2>

        {/* Show validation error inside the modal if save fails */}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <label>Title
            <input
              type="text"
              value={fields.title}
              onChange={(e) => setFields({ ...fields, title: e.target.value })}
            />
          </label>

          <label>Platform
            <input
              type="text"
              value={fields.platform}
              onChange={(e) => setFields({ ...fields, platform: e.target.value })}
            />
          </label>

          <label>Genre
            <input
              type="text"
              value={fields.genre}
              onChange={(e) => setFields({ ...fields, genre: e.target.value })}
            />
          </label>

          <label>Status
            <select
              value={fields.status}
              onChange={(e) => { 
                const newStatus = e.target.value as Status;
                const newProgress = newStatus === 'Completed' ? 100
                : fields.status === 'Completed' ? 0
                : fields.progress
                setFields({...fields, status: newStatus, progress: newProgress })
              }}
            >
              <option value="Backlog">Backlog</option>
              <option value="Playing">Playing</option>
              <option value="Completed">Completed</option>
              <option value="Dropped">Dropped</option>
            </select>
          </label>

          <label>Priority
            <select
              value={fields.priority}
              onChange={(e) => setFields({ ...fields, priority: e.target.value as Priority })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>

          {/* Star rating — clicking a star sets the rating */}
          <label>Rating</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(n => (
              <span key={n} onClick={() => handleStarClick(n)}>
                {n <= fields.rating ? '★' : '☆'}
              </span>
            ))}
          </div>

          {/* Progress — slider is disabled when status is Completed */}
          <label>Progress: {isCompleted ? 100 : fields.progress}%
            <input
              type="range"
              min={0}
              max={100}
              value={isCompleted ? 100 : fields.progress}
              disabled={isCompleted}
              onChange={(e) => setFields({ ...fields, progress: Number(e.target.value) })}
            />
          </label>

          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
}