const taskController = require("../controller/task");
const express = require("express");
const router = express.Router();

router.post("/tasks",taskController.createTask);
router.get("/tasks",taskController.getTask);
router.put("/tasks/:id",taskController.updateTask);
router.delete("/tasks/:id",taskController.deleteTask);


module.exports = router;