import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../../src/components/TodoItem';
import { Todo } from '../../src/types/types';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: 1,
    text: 'Going to the hospital',
    completed: false,
    order: 0,
    dueDate: '2025-05-23',
    priority: 'high',
  };
  const onToggle = jest.fn();
  const onDelete = jest.fn();
  const onUpdate = jest.fn();
  const onOpenModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo details', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onOpenModal={onOpenModal}
      />
    );
    expect(screen.getByText('Going to the hospital')).toBeInTheDocument();
    expect(screen.getByText('Due: 2025-05-25')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('toggles completion when checkbox is clicked', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onOpenModal={onOpenModal}
      />
    );
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it('calls onDelete when delete button is clicked', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onOpenModal={onOpenModal}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('opens modal when todo text is clicked', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onOpenModal={onOpenModal}
      />
    );
    await userEvent.click(screen.getByText('Going to the hospital'));
    expect(onOpenModal).toHaveBeenCalledWith(mockTodo);
  });
});
