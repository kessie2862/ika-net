import { useState } from 'react';
import { Todo } from '../types/types';
import EditTodoForm from './EditTodoForm';

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
}

export default function TodoModal({
  isOpen,
  onClose,
  todo,
  onUpdate,
}: TodoModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !todo) return null;

  const handleSave = (updates: Partial<Todo>) => {
    onUpdate(todo.id, updates);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        {isEditing ? (
          <EditTodoForm
            todo={todo}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {todo.text}
            </h2>
            <p className="text-gray-700">
              <strong>Due Date:</strong> {todo.dueDate || 'Not set'}
            </p>
            <p className="text-gray-700">
              <strong>Priority:</strong>{' '}
              {todo.priority
                ? todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)
                : 'Not set'}
            </p>
            <p className="text-gray-700">
              <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
            </p>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onClose}
                className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
