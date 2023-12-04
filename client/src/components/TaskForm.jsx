
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskForm({ onAddTask, onUpdateTask, editTask }) {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    workSchedule: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // If there is an editTask, update the form fields
    if (editTask) {
      setNewTask(editTask);
      setIsEditing(true);
    } else {
      setNewTask({
        title: '',
        description: '',
        deadline: '',
        workSchedule: '',
      });
      setIsEditing(false);
    }
  }, [editTask]);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        onUpdateTask(newTask);
        setIsEditing(false);
        toast.success('Task updated successfully!');
      } else {
        onAddTask(newTask);
        toast.success('Task added successfully!');
      }

      setNewTask({ title: '', description: '', deadline: '', workSchedule: '' });
    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewTask({ title: '', description: '', deadline: '', workSchedule: '' });
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-4 rounded-lg shadow-md w-full ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              className="input"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
           
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              className="input"
              value={newTask.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
           
            <input
              type="date"
              name="deadline"
              className="input"
              value={newTask.deadline}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
           
            <input
              type="text"
              name="workSchedule"
              placeholder="Enter work schedule"
              className="input"
              value={newTask.workSchedule}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className={`btn ${isEditing ? "btn-primary" : "btn-secondary"}`}
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelClick}
                className="btn btn-secondary ml-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Modal for Editing */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="editedTitle"
                  className="block text-sm font-medium text-gray-600"
                >
                  Edited Title
                </label>
                <input
                  type="text"
                  id="editedTitle"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editedDescription"
                  className="block text-sm font-medium text-gray-600"
                >
                  Edited Description
                </label>
                <input
                  type="text"
                  id="editedDescription"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editedDeadline"
                  className="block text-sm font-medium text-gray-600"
                >
                  Edited Deadline
                </label>
                <input
                  type="text"
                  id="editedDeadline"
                  name="deadline"
                  value={newTask.deadline}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editedDeadline"
                  className="block text-sm font-medium text-gray-600"
                >
                  Adjust WorkSchedule
                </label>
                <input
                  type="text"
                  id="editworkSchedule"
                  name="workSchedule"
                  value={newTask.workSchedule}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Task
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskForm;
