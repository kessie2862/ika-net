import axios from 'axios';
import { Todo } from '../types/types';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get('/todos');
  return response.data;
};

export const createTodo = async (data: {
  text: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}): Promise<Todo> => {
  const response = await api.post('/todos', { ...data, completed: false });
  return response.data;
};

export const updateTodo = async (
  id: number,
  updates: Partial<Todo>
): Promise<Todo> => {
  const response = await api.patch(`/todos/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
