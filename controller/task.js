const { errorhendler } = require("../middlewares/error.js");
const Task = require("../models/task.js");

const newTask = async (req, res, next) => {
  try {
    const { Title, Discription } = req.body;

    await Task.create({
      Title,
      Discription,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      massege: "Task Added",
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const task = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new errorhendler("No task to update", 400));

    task.isComplated = !task.isComplated;

    await task.save();

    res.status(200).json({
      success: true,
      massege: "Task UpDated",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new errorhendler("No task to delete", 400));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      massege: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newTask, getTask, updateTask, deleteTask };
