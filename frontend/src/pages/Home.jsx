import { useState, useEffect } from 'react';
import TaskForm from '../components/Tasks/TaskForm';
import TaskList from '../components/Tasks/TaskList';
import { getTasks } from '../api/tasks';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    sortBy: 'dueDate',
    sortOrder: 'asc',
    search: ''
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);
  
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await getTasks(filters);
      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.message || 'Failed to fetch tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  if (isLoading) return <div className="text-center mt-8">Loading tasks...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-center mb-6">Task Manager</h1>
      <div className="w-full max-w-lg">
        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList 
          tasks={tasks} 
          onTaskUpdated={fetchTasks} 
          onTaskDeleted={fetchTasks}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
}
