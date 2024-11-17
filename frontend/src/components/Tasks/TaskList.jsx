import { useState } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted, filters, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ search: searchTerm });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ status: e.target.value });
  };

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    onFilterChange({ sortBy, sortOrder });
  };

  return (
    <div>
      <div className="mb-4">
        <form onSubmit={handleSearchSubmit} className="flex mb-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            className="flex-grow p-2 border rounded-l"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">Search</button>
        </form>
        <div className="flex justify-between">
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className="p-2 border rounded"
          >
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={handleSortChange}
            className="p-2 border rounded"
          >
            <option value="dueDate-asc">Due Date (Ascending)</option>
            <option value="dueDate-desc">Due Date (Descending)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center mt-4">No tasks found. Start by adding a new task!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
}
