const Task = require("../model/task")

exports.getTask = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
 exports.createTask = async (req, res) => {
    const { title, description, deadline,workSchedule } = req.body;
  
    try {
      const newTask = new Task({ title, description, deadline,workSchedule }); // Include the deadline
      const savedTask = await newTask.save();
      res.json(savedTask);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
exports.deleteTask = async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  exports.updateTask =  async (req, res) => {
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
  };
  