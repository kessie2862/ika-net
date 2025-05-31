import { useState, useEffect } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { getTodos, updateTodo, deleteTodo } from '../services/todoService';
import { Todo } from '../types/types';
import toast from 'react-hot-toast';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let data = await getTodos();
        const hasMissingOrder = data.some((todo) => todo.order === undefined);
        if (hasMissingOrder) {
          data = data.map((todo, index) => ({ ...todo, order: index }));
          await Promise.all(
            data.map((todo) => updateTodo(todo.id, { order: todo.order }))
          );
        }
        data.sort((a, b) => a.order - b.order);
        setTodos(data);
      } catch {
        setError('Failed to load todos. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (newTodo: Todo) => {
    const nextOrder =
      todos.length > 0 ? Math.max(...todos.map((t) => t.order)) + 1 : 0;
    const updatedTodo = { ...newTodo, order: nextOrder };
    setTodos((prev) => [...prev, updatedTodo]);
    await updateTodo(newTodo.id, { order: nextOrder });
    toast.success('Todo added successfully');
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const updatedTodo = { ...todo, completed: !todo.completed };
    try {
      await updateTodo(id, { completed: updatedTodo.completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
      toast.success('Todo updated successfully');
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const deleteTodoHandler = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success('Todo deleted successfully');
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const updateTodoHandler = async (id: number, updates: Partial<Todo>) => {
    try {
      const updatedTodo = await updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
      toast.success('Todo updated successfully');
    } catch (error) {
      console.error('Failed to update todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const updatedTodos = items.map((item, index) => ({
      ...item,
      order: index,
    }));
    setTodos(updatedTodos);
    Promise.all(
      updatedTodos.map((todo) => updateTodo(todo.id, { order: todo.order }))
    );
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo: deleteTodoHandler,
    updateTodo: updateTodoHandler,
    onDragEnd,
  };
};
