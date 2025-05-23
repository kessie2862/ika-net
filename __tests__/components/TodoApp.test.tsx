import { render, screen, waitFor } from '@testing-library/react';
import TodoApp from '../../src/components/TodoApp';
import { getTodos } from '../../src/services/todoService';

jest.mock('../../src/services/todoService', () => ({
  getTodos: jest.fn(),
}));

describe('TodoApp', () => {
  it('renders todo list when data is loaded', async () => {
    const mockTodos = [
      { id: 1, text: 'Working on Todo task', completed: false, order: 0 },
      { id: 2, text: 'Going to the hospital', completed: true, order: 1 },
    ];
    (getTodos as jest.Mock).mockResolvedValue(mockTodos);
    render(<TodoApp />);
    await waitFor(() => {
      expect(screen.getByText('Working on Todo task')).toBeInTheDocument();
      expect(screen.getByText('Going to the hospital')).toBeInTheDocument();
    });
  });
});
