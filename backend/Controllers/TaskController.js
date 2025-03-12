const Task = require("../Models/TaskModel");
const User = require("../Models/userModel");
const express = require("express");
const { default: mongoose } = require("mongoose");

// create task
const createTask = async (req, res) => {
  let user = await User.findById(req.user.id);
  let { tasktitle, description } = req.body;
  const task = await new Task({
    tasktitle,
    description,
  });
  task
    .save()
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Error while createting task",
        });
      }

      try {
        var session = await mongoose.startSession();
        session.startTransaction();
        await task.save(session);
        user.tasks.push(task);
        await user.save(session);
        await session.commitTransaction();
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Task created successfully",
        result,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

// All tasks
const allTasks = async (req, res) => {
  let user = await User.findById(req.user.id)
    .populate("tasks")
    // await Task.find({})
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Error reteriving tasks",
        });
      }

      let tasks = result.tasks;
      return res.status(200).json({
        success: true,
        tasks,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

// updatte task
const updateTasks = async (req, res) => {
  let { tasktitle, description } = req.body;

  const task = await Task.findByIdAndUpdate(req.params.id, {
    tasktitle,
    description,
  })
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "An unexpected error occur while updating ",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Task successfully updated",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

// get single task
const singleTask = async (req, res) => {
  await Task.findById(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Error reteriving task detail",
        });
      }
      return res.status(200).json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

// Delete task
const deleteTask = async (req, res) => {
  let user = await User.findById(req.user.id);

  let task = await Task.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Unable To Delete",
        });
      }
      user.tasks.pull(result);
      user.save();
      return res.status(200).json({
        success: true,
        message: "Task  Deleted",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

// task complete
const taskStatus = async (req, res) => {
  const status = req.body.status;
  await Task.findById(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Error reteriving task detail",
        });
      }
      result.status = status;
      result.save();
      return res.status(200).json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

// Search tasks by status
const searchTasksByStatus = async (req, res) => {
  const { status } = req.query;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status query parameter is required",
    });
  }

  try {
    // Find the authenticated user and populate tasks
    const user = await User.findById(req.user.id).populate({
      path: "tasks",
      match: { status: { $regex: status, $options: "i" } },
    });

    if (!user || !user.tasks.length) {
      return res.status(404).json({
        success: false,
        message: "No tasks found with the specified status",
      });
    }

    return res.status(200).json({
      success: true,
      tasks: user.tasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createTask,
  allTasks,
  updateTasks,
  deleteTask,
  singleTask,
  taskStatus,
  searchTasksByStatus,
};
