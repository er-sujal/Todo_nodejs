const mongoose = require("mongoose");

const Task = mongoose.model(
  "Tasks",
  new mongoose.Schema({
    Title: {
      type: String,
      required: true,
    },
    Discription: {
      type: String,
      required: true,
    },
    isComplated: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      reference: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = Task;
