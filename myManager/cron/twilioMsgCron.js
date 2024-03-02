// Increase the maximum number of listeners for the TLSSocket event emitter
require('events').EventEmitter.defaultMaxListeners = 30; // or any

const cron = require('node-cron');
const Task = require('../models/Task');
const User = require('../models/User');
const twilio = require('twilio');
require("dotenv").config();

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

cron.schedule('*/10 * * * * *', async () => {
    try {
        const users = await User.find({}).sort({ priority: 1 });
        console.log("Sending Twilio message");
        for (const user of users) {
            console.log(user._id);
            const tasks = await Task.find({ _id: { $in: user.tasks }, due_date: { $lt: new Date() } });
            const overdueTasks = tasks.filter(task => task.status !== 'DONE');
            console.log("overdue tasks length :", overdueTasks.length);
            
            if (overdueTasks.length > 0) {
                console.log(`Sending Twilio message to ${user.phone_number}`);

                // Compose message body
                const messageBody = `Hey ${user.firstName}, your due date has passed. Hurry up and complete your tasks!`;

                // Send Twilio message to user's phone number
                await client.messages.create({
                    body: messageBody,
                    to: user.phone_number,
                    from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
                });

                console.log(`Message sent to ${user.phone_number}`);

                // Wait for some time before sending the next message
                await new Promise(resolve => setTimeout(resolve, 30000)); // Wait for 30 seconds
            }
        }
    } catch (error) {
        console.error('Error in Twilio messaging:', error);
    }
});
