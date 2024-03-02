const cron = require('node-cron');
const Task = require('../models/Task');
const User = require('../models/User');

cron.schedule('* * * * *', async () => {
    try {
        // Fetch all users
        const users = await User.find();

        for (const user of users) {
            const tasks = await Task.find({ _id: { $in: user.tasks }, status: { $in: ['TODO', 'IN_PROGRESS'] } });

            let minTaskPriority = 3; // Set to the highest priority initially

            for (const task of tasks) {
                const currentDate = new Date();
                const utcDueDate = new Date(task.due_date.setUTCHours(0, 0, 0, 0)); 
                const diffTime = utcDueDate.getTime() - currentDate.getTime(); // Difference in milliseconds
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days

                let priority = 0;
                console.log("task id :",task._id," diff Days :",diffDays);
                if (diffDays <= 0) {
                    priority = 0;
                } else if (diffDays >= 1 && diffDays <= 2) {
                    priority = 1;
                } else if (diffDays >= 3 && diffDays <= 4) {
                    priority = 2;
                } else {
                    priority = 3;
                }

                console.log("updating priority from :", task.priority, "  to :", priority);
                await Task.findByIdAndUpdate(task._id, { priority });

                if (priority < minTaskPriority) {
                    minTaskPriority = priority;
                }
            }

            // Update user priority
            if (minTaskPriority < 3) {
                console.log("updating priority for User id :", user._id, "  to :", minTaskPriority);
                await User.findByIdAndUpdate(user._id, { priority: minTaskPriority });
            }
        }
    } catch (error) {
        console.error('Error in priority update cron job:', error);
    }
});