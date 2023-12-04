// mern-task-manager-frontend/src/services/taskService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/tasks';

const getTasks = () => {
  return axios.get(API_BASE_URL);
};

const addTask = (newTask) => {
  return axios.post(API_BASE_URL, newTask);
};

const editTask = (taskId, editedTask) => {
  return axios.put(`${API_BASE_URL}/${taskId}`, editedTask);
};

const deleteTask = (taskId) => {
  return axios.delete(`${API_BASE_URL}/${taskId}`);
};

export { getTasks, addTask, editTask, deleteTask };
