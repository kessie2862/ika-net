import { useState } from 'react';
import { createTodo as createTodoService } from '../services/todoService';
import { Todo } from '../types/types';

export const useCreateTodo = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createTodo = async (data: {
    text: string;
    dueDate?: string;
    priority?: 'low' | 'medium' | 'high';
    completed?: boolean;
  }): Promise<Todo> => {
    setIsCreating(true);
    try {
      const newTodo = await createTodoService({
        ...data,
        completed: false,
      });
      return newTodo;
    } finally {
      setIsCreating(false);
    }
  };

  return { createTodo, isCreating };
};
