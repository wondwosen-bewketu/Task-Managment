// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, addTask, editTask, deleteTask } from './services/taskServices';
import Header from './components/Header';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    getTasks()
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  };

  const handleToggleStatus = (taskId, currentStatus) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: getNextStatus(currentStatus) } : task
    );

    // Update status in the backend (optional)
    // Call a backend API to update the status of the task

    setTasks(updatedTasks);
  };

  const handleAddTask = (newTask) => {
    // Add a new task to the backend
    addTask(newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => console.error(error));
  };

  const handleUpdateTask = (updatedTask) => {
    // Update an existing task in the backend
    editTask(selectedTask._id, updatedTask)
      .then(response => {
        setTasks(tasks.map(task => (task._id === selectedTask._id ? response.data : task)));
        setSelectedTask(null); // Close the modal after updating
      })
      .catch(error => console.error(error));
  };

  const handleEditTask = (task) => {
    // Open the modal for editing
    setSelectedTask(task);
  };

  const handleDeleteTask = (taskId) => {
    // Delete a task from the backend
    deleteTask(taskId)
      .then(() => setTasks(tasks.filter(task => task._id !== taskId)))
      .catch(error => console.error(error));
  };

  const getNextStatus = (currentStatus) => {
    // Implement logic to toggle between "To Do," "In Progress," and "Done"
    switch (currentStatus) {
      case "To Do":
        return "In Progress";
      case "In Progress":
        return "Done";
      case "Done":
        return "To Do";
      default:
        return "To Do";
    }
  };

  return (
    <>
    
    <Header/>
    <div className="max-w-2xl p-8 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-4">Add Tasks</h1>

      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editTask={selectedTask}
        
      />
    
  </div>
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onToggleStatus={handleToggleStatus} />
      </>
  );
}

export default App;




