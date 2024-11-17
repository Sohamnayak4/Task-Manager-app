// src/components/Tasks/TaskForm.jsx
import { useState } from 'react';
import { createTask } from '../../api/tasks';

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('To Do');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const newTask = await createTask({ title, description, dueDate, status });
      onTaskCreated(newTask);
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('To Do');
    } catch (error) {
      setError('Failed to create task: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="w-full p-2 mb-2 border rounded"
        required
      ></textarea>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button 
        type="submit" 
        className="w-full p-2 bg-blue-600 text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Adding Task...' : 'Add Task'}
      </button>
    </form>
  );
}
