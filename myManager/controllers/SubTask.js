const Task = require("../models/Task");
const User = require("../models/User");
const SubTask = require("../models/SubTask");


exports.createSubTask = async (req, res) => {
    try {
        let { subtaskDescription, taskId } = req.body;

        if (!taskId || !subtaskDescription) {
            return res.status(400).json({
                success: false,
                message: "Missing Mandatory Fields",
            });
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        const response = await SubTask.create({
            subtaskDescription,
        });

        if (!response) {
            return res.status(500).json({
                success: false,
                message: "Failed to create subtask",
            });
        }

        task.subTasks.push(response._id);
        await task.save();

        res.status(200).json({
            success: true,
            data: response,
            message: 'Entry created successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: {},
            error: error.message,
            message: 'Internal error'
        });
    }
};



//get
exports.getTaskSubTasks = async (req, res) => {
    try {
        const TaskId = req.params.id;
        const { page = 1, limit = 10 } = req.query;

        const task = await Task.findById(TaskId).populate("subTasks").exec();

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "task not found",
            });
        }
        
        console.log(task);
        // Paginate the subtasks
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedSubTasks = task.subTasks.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            data: paginatedSubTasks,
            message: `SubTasks fetched successfully for user with ID ${TaskId}`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};




//update

exports.updateSubTask = async (req, res) => {
    try {
        const subTaskId = req.params.id;
        const { status,taskId } = req.body;
        if (status === undefined || taskId === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing Mandatory Fields",
            });
        }

        // Update subtask status
        const response = await SubTask.findByIdAndUpdate(subTaskId, { status });

        // Fetch all subtasks of the mentioned task
        const task = await Task.findById(taskId).populate('subTasks');
        const subtasks = task.subTasks;

        // Calculate task status
        let taskStatus = 'TODO';
        const isAnySubtaskInProgress = subtasks.some(subtask => subtask.status === 0);
        if (isAnySubtaskInProgress) {
            taskStatus = 'IN_PROGRESS';
        } else {
            const isAllSubtasksCompleted = subtasks.every(subtask => subtask.status === 1);
            if (isAllSubtasksCompleted) {
                taskStatus = 'DONE';
            }
        }

        // Update task status
        const result = await Task.findByIdAndUpdate(taskId, { status: taskStatus });

        res.status(200).json({
            success: true,
            data: { subtask: response, task: result },
            message: 'Subtask and Task status updated successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal error',
            error: error.message
        });
    }
};



//delete
exports.deleteSubTask = async (req, res) => {
    try {
        const subTaskId = req.params.id;

        const deletedSubTask = await SubTask.findByIdAndUpdate(subTaskId, { deleted_at: Date.now() }, { new: true });

        if (!deletedSubTask) {
            return res.status(404).json({
                success: false,
                message: "SubTask not found",
            });
        }

        res.status(200).json({
            success: true,
            data: deletedSubTask,
            message: "SubTask deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};