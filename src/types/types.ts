export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  order: number;
}

export type FilterType = 'all' | 'active' | 'completed';
