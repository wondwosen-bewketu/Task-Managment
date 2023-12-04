const mongoose = require("mongoose");

// Define the Task model
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  workSchedule: {
    type: String,
    required: true,
  }, 
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
