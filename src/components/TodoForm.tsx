import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createTodo } from '../services/todoService';
import { Todo } from '../types/types';

const todoSchema = Yup.object().shape({
  text: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(100, 'Must be at most 100 characters')
    .required('Required'),
  dueDate: Yup.string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  priority: Yup.string()
    .optional()
    .oneOf(['low', 'medium', 'high'], 'Invalid priority'),
});

interface TodoFormProps {
  onAddTodo: (todo: Todo) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  return (
    <Formik
      initialValues={{ text: '', dueDate: '', priority: '' }}
      validationSchema={todoSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const newTodo = await createTodo({
            text: values.text,
            dueDate: values.dueDate || undefined,
            priority:
              values.priority === 'low' ||
              values.priority === 'medium' ||
              values.priority === 'high'
                ? values.priority
                : undefined,
          });
          onAddTodo(newTodo);
          resetForm();
        } catch (error) {
          console.error('Failed to create todo:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="mb-8 flex flex-col gap-4 bg-white p-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="text" className="block text-gray-700 mb-1">
              Todo
            </label>
            <Field
              id="text"
              type="text"
              name="text"
              placeholder="Add a new todo"
              className="w-full rounded-md border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="text"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-gray-700 mb-1">
              Due Date
            </label>
            <Field
              id="dueDate"
              type="date"
              name="dueDate"
              className="w-full rounded-md border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="dueDate"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-gray-700 mb-1">
              Priority
            </label>
            <Field
              as="select"
              id="priority"
              name="priority"
              className="w-full rounded-md border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Field>
            <ErrorMessage
              name="priority"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            Add Todo
          </button>
        </Form>
      )}
    </Formik>
  );
}
