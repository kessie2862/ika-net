import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../../src/components/TodoForm';
import { createTodo } from '../../src/services/todoService';

jest.mock('../../src/services/todoService', () => ({
  createTodo: jest.fn(),
}));

describe('TodoForm', () => {
  const onAddTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields and submit button', () => {
    render(<TodoForm onAddTodo={onAddTodo} />);
    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument();
    expect(screen.getByLabelText('Due Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const mockTodo = {
      id: 1,
      text: 'Going to the hospital',
      completed: false,
      order: 0,
      dueDate: '2025-05-23',
      priority: 'high',
    };
    (createTodo as jest.Mock).mockResolvedValue(mockTodo);

    render(<TodoForm onAddTodo={onAddTodo} />);
    await userEvent.type(
      screen.getByPlaceholderText('Add a new todo'),
      'Going to the hospital'
    );
    await userEvent.type(screen.getByLabelText('Due Date'), '2025-05-23');
    await userEvent.selectOptions(screen.getByLabelText('Priority'), 'high');
    await userEvent.click(screen.getByText('Add Todo'));

    expect(createTodo).toHaveBeenCalledWith({
      text: 'Going to the hospital',
      dueDate: '2025-05-23',
      priority: 'high',
    });
    await waitFor(() => expect(onAddTodo).toHaveBeenCalledWith(mockTodo));
  });
});
