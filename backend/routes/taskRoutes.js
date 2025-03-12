const express = require("express");
const {
  createTask,
  allTasks,
  updateTasks,
  singleTask,
  deleteTask,
  taskStatus,
  searchTasksByStatus,
} = require("../Controllers/TaskController");
const isAuthenticated = require("../Middleware/auth");

const router = express.Router();

router.post("/createtasks", isAuthenticated, createTask);
router.get("/tasks", isAuthenticated, allTasks);
router.put("/updatetask/:id", isAuthenticated, updateTasks);
router.get("/task/:id", isAuthenticated, singleTask);
router.delete("/deletetask/:id", isAuthenticated, deleteTask);
router.put("/status/:id", isAuthenticated, taskStatus);
router.get("/search", isAuthenticated, searchTasksByStatus);

module.exports = router;
