const mongoose = require("mongoose");

const TaskModel = new mongoose.Schema({
  tasktitle: {
    type: String,
    required: [true, "please Enter task name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter task Description"],
  },
  status: {
    type: String,
    default: "pending",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", TaskModel);
