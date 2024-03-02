const { response } = require("express");
const Task = require("../models/Task");
const User = require("../models/User");

exports.createTask = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            title,
            description,
            due_date
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Missing Mandatory Fields",
            });
        }


        const response = await Task.create({
            title,
            description,
            due_date
        });

        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { tasks: response._id } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: response,
            message: 'Entry created successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: {},
            message: 'Internal error'
        });
    }
};


exports.getUserTasks = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming userId is passed in the request parameters
        const { priority, due_date, status, page = 1, limit = 10 } = req.body;

        const user = await User.findById(userId).populate("tasks").exec();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Filter tasks based on priority, due_date, and status
        let filteredTasks = user.tasks.filter(task => {
            let match = true;
            if (priority !== undefined && task.priority !== priority) match = false; // Check if priority is defined in the request body
            if (due_date && new Date(task.due_date) > new Date(due_date)) match = false;
            if (status && task.status !== status) match = false;
            return match;
        });

        // Paginate filtered tasks
        const paginatedTasks = filteredTasks.slice((page - 1) * limit, page * limit);

        res.status(200).json({
            success: true,
            data: paginatedTasks,
            message: `Tasks fetched successfully for user with ID ${userId}`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};




// 3. Update task details
exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title,description,due_date, status,priority } = req.body;

        // Build update object with provided fields
        const update = {};
        if (due_date) update.due_date = due_date;
        if (status) update.status = status;
        if (title) update.title = title;
        if (description) update.description = description;
        if (priority) update.priority = priority;

        const updatedTask = await Task.findByIdAndUpdate(taskId, update, { new: true });

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedTask,
            message: "Task updated successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// 4. Soft delete a task
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await Task.findByIdAndUpdate(taskId, { deleted_at: Date.now() }, { new: true });

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            data: deletedTask,
            message: "Task deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};