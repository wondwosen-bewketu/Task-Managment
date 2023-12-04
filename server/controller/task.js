const Task = require("../model/task");
const { handleAsync, notFound } = require("../utils/errorHandler");

exports.getTasks = handleAsync(async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

exports.createTask = handleAsync(async (req, res) => {
  const { title, description, deadline, workSchedule } = req.body;

  const newTask = new Task({ title, description, deadline, workSchedule });
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
});

exports.deleteTask = handleAsync(async (req, res) => {
  const taskId = req.params.id;
  const deletedTask = await Task.findByIdAndDelete(taskId);

  if (!deletedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted successfully" });
});

exports.updateTask = handleAsync(async (req, res) => {
  const taskId = req.params.id;
  const { title, description, deadline, status, workSchedule } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description, deadline, status, workSchedule },
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(updatedTask);
});

exports.taskNotFound = notFound;
