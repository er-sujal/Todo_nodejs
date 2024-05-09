const express = require("express");
const {
  newTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/task.js");
const isAuth = require("../middlewares/auth.js");
const router = express.Router();

router.post("/new", isAuth, newTask);
router.get("/all", isAuth, getTask);
router.route("/:id").put(isAuth, updateTask).delete(isAuth, deleteTask);

module.exports = router;
