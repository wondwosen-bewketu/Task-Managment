// mern-task-manager-frontend/src/components/TaskList.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-screen-xl mx-auto">
        
        <table className="w-full bg-gray-200 border-collapse shadow-lg rounded-md overflow-hidden">
          <thead className="bg-gray-300 text-black">
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Deadline</th>
              <th className="py-2 px-4 border-b">Work Schedule</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-200 transition-all">
                <td className="py-2 px-4 border-b">{task.title}</td>
                <td className="py-2 px-4 border-b">{task.description}</td>
                <td className="py-2 px-4 border-b">{task.deadline}</td>
                <td className="py-2 px-4 border-b">{task.workSchedule}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => onToggleStatus(task._id, task.status)}
                    className={`status-btn-${task.status.toLowerCase()} rounded-full px-4 py-.5`}
                  >
                    {task.status}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => onEdit(task)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-500 hover:underline"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
