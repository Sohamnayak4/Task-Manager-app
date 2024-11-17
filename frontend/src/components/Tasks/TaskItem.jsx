import { useState } from 'react';
import { updateTask, deleteTask } from '../../api/tasks';

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate.split('T')[0]);
  const [status, setStatus] = useState(task.status);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setIsLoading(true);
    setError('');
    try {
      await updateTask(task._id, { title, description, dueDate, status });
      setIsEditing(false);
      onTaskUpdated();
    } catch (error) {
      setError('Failed to update task: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError('');
    try {
      await deleteTask(task._id);
      onTaskDeleted();
    } catch (error) {
      setError('Failed to delete task: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded shadow">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          onClick={handleUpdate} 
          className="mr-2 px-4 py-2 bg-green-600 text-white rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
        <button 
          onClick={() => setIsEditing(false)} 
          className="px-4 py-2 bg-gray-600 text-white rounded"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
      <p className="mb-2">{task.description}</p>
      <p className="mb-2">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p className="mb-4">Status: {task.status}</p>
      <button 
        onClick={() => setIsEditing(true)} 
        className="mr-2 px-4 py-2 bg-blue-600 text-white rounded"
        disabled={isLoading}
      >
        Edit
      </button>
      <button 
        onClick={handleDelete} 
        className="px-4 py-2 bg-red-600 text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
