export type Status = 'Playing' | 'Completed' | 'Backlog' | 'Dropped';
export type Priority = 'High' | 'Medium' | 'Low';

export interface Game {
  id: string;
  title: string;
  platform: string;
  genre: string;
  status: Status;
  rating: number;    // 0–5, 0 = unrated
  priority: Priority;
  progress: number;  // 0–100
}