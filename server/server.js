const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB (Make sure you have MongoDB installed and running)
mongoose
  .connect("mongodb://0.0.0.0:27017/mern_task_manager")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());

// Define the Task model
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: String, // Add the deadline field
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  workSchedule: String, // Add work schedule field
});

const Task = mongoose.model("Task", taskSchema);

// Routes
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { title, description, deadline,workSchedule } = req.body;

  try {
    const newTask = new Task({ title, description, deadline,workSchedule }); // Include the deadline
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ...

app.put("/api/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { title, description, deadline, status, workSchedule } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, deadline, status, workSchedule },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
