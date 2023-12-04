const express = require("express");
const taskController = require("../controller/task");
const { handleAsync } = require("../utils/errorHandler");

const router = express.Router();

router
  .route("/tasks")
  .get(handleAsync(taskController.getTasks))
  .post(handleAsync(taskController.createTask));

router
  .route("/tasks/:id")
  .put(handleAsync(taskController.updateTask))
  .delete(handleAsync(taskController.deleteTask));

module.exports = router;
