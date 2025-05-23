'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Todo } from '../types/types';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoModal from './TodoModal';
import { Toaster } from 'react-hot-toast';
import {
  fetchTodos,
  handleAddTodo,
  handleToggle,
  handleDelete,
  handleUpdate,
  handleOpenModal,
  onDragEnd,
} from './todoHandlers';

type FilterType = 'all' | 'active' | 'completed';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos(setTodos, setError, setLoading);
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const filterButtonClass = (currentFilter: FilterType) =>
    `px-3 py-1 rounded transition-colors ${
      filter === currentFilter
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto max-w-2xl p-6 bg-gray-100 rounded-lg shadow-sm">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Todo App</h1>
      <TodoForm
        onAddTodo={(newTodo) => handleAddTodo(newTodo, todos, setTodos)}
      />
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={filterButtonClass('all')}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={filterButtonClass('active')}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filterButtonClass('completed')}
        >
          Completed
        </button>
      </div>
      {filteredTodos.length === 0 ? (
        <p className="text-gray-500 text-center">No todos found.</p>
      ) : filter === 'all' ? (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, todos, setTodos)}
        >
          <Droppable droppableId="todos">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {todos.map((todo, index) => (
                  <Draggable
                    key={todo.id.toString()}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-4"
                      >
                        <TodoItem
                          todo={todo}
                          onToggle={() =>
                            handleToggle(todo.id, todos, setTodos)
                          }
                          onDelete={() => handleDelete(todo.id, setTodos)}
                          onUpdate={(id, updates) =>
                            handleUpdate(id, updates, setTodos, setError)
                          }
                          onOpenModal={(todo) =>
                            handleOpenModal(
                              todo,
                              setSelectedTodo,
                              setIsModalOpen
                            )
                          }
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="mb-4">
              <TodoItem
                todo={todo}
                onToggle={() => handleToggle(todo.id, todos, setTodos)}
                onDelete={() => handleDelete(todo.id, setTodos)}
                onUpdate={(id, updates) =>
                  handleUpdate(id, updates, setTodos, setError)
                }
                onOpenModal={(todo) =>
                  handleOpenModal(todo, setSelectedTodo, setIsModalOpen)
                }
              />
            </li>
          ))}
        </ul>
      )}
      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        todo={selectedTodo}
        onUpdate={(id, updates) =>
          handleUpdate(id, updates, setTodos, setError)
        }
      />
      <Toaster position="top-right" />
    </div>
  );
}
