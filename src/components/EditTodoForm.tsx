import { useState, useEffect } from 'react';
import { Todo } from '../types/types';

interface EditTodoFormProps {
  todo: Todo;
  onSave: (updates: Partial<Todo>) => void;
  onCancel: () => void;
}

export default function EditTodoForm({
  todo,
  onSave,
  onCancel,
}: EditTodoFormProps) {
  const [editedText, setEditedText] = useState(todo.text);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || '');
  const [editedPriority, setEditedPriority] = useState(todo.priority || '');

  useEffect(() => {
    setEditedText(todo.text);
    setEditedDueDate(todo.dueDate || '');
    setEditedPriority(todo.priority || '');
  }, [todo]);

  const handleSave = () => {
    if (editedText.trim() !== '') {
      const updates: Partial<Todo> = {
        text: editedText,
        dueDate: editedDueDate || undefined,
        priority:
          editedPriority === 'low' ||
          editedPriority === 'medium' ||
          editedPriority === 'high'
            ? editedPriority
            : undefined,
      };
      onSave(updates);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        className="rounded-md border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        value={editedDueDate}
        onChange={(e) => setEditedDueDate(e.target.value)}
        className="rounded-md border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={editedPriority}
        onChange={(e) => setEditedPriority(e.target.value)}
        className="rounded-md border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
