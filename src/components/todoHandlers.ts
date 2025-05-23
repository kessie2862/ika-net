import { Dispatch, SetStateAction } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { getTodos, updateTodo, deleteTodo } from '../services/todoService';
import { Todo } from '../types/types';
import toast from 'react-hot-toast';

export const fetchTodos = async (
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    // Retrieve todos from the server
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

export const handleAddTodo = async (
  newTodo: Todo,
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
) => {
  const nextOrder =
    todos.length > 0 ? Math.max(...todos.map((t) => t.order)) + 1 : 0;
  const updatedTodo = { ...newTodo, order: nextOrder };
  setTodos((prev) => [...prev, updatedTodo]);
  await updateTodo(newTodo.id, { order: nextOrder });
  toast.success('Todo added successfully');
};

export const handleToggle = async (
  id: number,
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
) => {
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

export const handleDelete = async (
  id: number,
  setTodos: Dispatch<SetStateAction<Todo[]>>
) => {
  try {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    toast.success('Todo deleted successfully');
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
};

export const handleUpdate = async (
  id: number,
  updates: Partial<Todo>,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setError: Dispatch<SetStateAction<string | null>>
) => {
  try {
    const updatedTodo = await updateTodo(id, updates);
    setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
    toast.success('Todo updated successfully');
  } catch (error) {
    console.error('Failed to update todo:', error);
    setError('Failed to update todo. Please try again.');
  }
};

export const handleOpenModal = (
  todo: Todo,
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
) => {
  setSelectedTodo(todo);
  setIsModalOpen(true);
};

export const onDragEnd = (
  result: DropResult,
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
) => {
  if (!result.destination) return;
  const items = Array.from(todos);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);
  const updatedTodos = items.map((item, index) => ({
    ...item,
    order: index,
  }));
  setTodos(updatedTodos);
  // Update server with new order for all todos
  Promise.all(
    updatedTodos.map((todo) => updateTodo(todo.id, { order: todo.order }))
  );
};
