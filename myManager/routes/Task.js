const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { createTask, getUserTasks, updateTask, deleteTask } = require("../controllers/Task");

router.post("/createTask", auth, createTask);
router.get("/getUserTasks", auth, getUserTasks);
router.put("/updateTask/:id", auth, updateTask);
router.delete("/deleteTask/:id", auth, deleteTask);

module.exports = router;