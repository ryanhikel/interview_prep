import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('http://localhost:3001/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  },[tasks]);

  const handleTaskSubmit = async (task: Task) => {
    try {
      if (editingTask) {
        // Update an existing task
        await axios.put(`http://localhost:3001/api/tasks/${editingTask.id}`, task);
        setTasks(tasks.map((t) => (t.id === task.id? task: t)));
        setEditingTask(null);
      } else {
        // Create a new task
        const response = await axios.post<Task>('http://localhost:3001/api/tasks', task);
        setTasks([...tasks, response.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleTaskDelete = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id!== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <TaskForm initialTask={editingTask} onSubmit={handleTaskSubmit} />
      <TaskList onEdit={handleTaskEdit} onDelete={handleTaskDelete} />
    </div>
  );
};

export default App;