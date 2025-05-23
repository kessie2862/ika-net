'use client';

import { useState } from 'react';
import { Todo } from '../types/types';
import { TrashIcon } from '@heroicons/react/24/outline';
import EditTodoForm from './EditTodoForm';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
  onOpenModal: (todo: Todo) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  onOpenModal,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updates: Partial<Todo>) => {
    onUpdate(todo.id, updates);
    setIsEditing(false);
  };

  const isOverdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className="flex flex-col bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
      {isEditing ? (
        <EditTodoForm
          todo={todo}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => {
                e.stopPropagation();
                onToggle(todo.id);
              }}
              className="mr-3 h-5 w-5 text-blue-500"
            />
            <span
              onClick={() => onOpenModal(todo)}
              className={`cursor-pointer text-lg ${
                todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
              }`}
            >
              {todo.text}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2 sm:mt-0">
            {todo.dueDate && (
              <span
                className={`text-sm ${
                  isOverdue ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                Due: {todo.dueDate}
              </span>
            )}
            {todo.priority && (
              <span
                className={`text-sm font-medium ${
                  todo.priority === 'high'
                    ? 'text-red-500'
                    : todo.priority === 'medium'
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }`}
              >
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Delete"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
