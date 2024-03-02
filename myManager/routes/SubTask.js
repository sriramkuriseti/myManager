const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");

const { createSubTask , updateSubTask,getTaskSubTasks,deleteSubTask} = require("../controllers/SubTask");

router.post("/createSubTask", auth,createSubTask);
router.get("/getTaskSubTasks/:id", auth, getTaskSubTasks);
router.put("/updateSubTask/:id", auth, updateSubTask);
router.delete("/deleteSubTask/:id", auth, deleteSubTask);

module.exports = router;