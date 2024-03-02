// Increase the maximum number of listeners for the TLSSocket event emitter
require('events').EventEmitter.defaultMaxListeners = 30;

const cron = require('node-cron');
const Task = require('../models/Task');
const User = require('../models/User');
const twilio = require('twilio');
require("dotenv").config();

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

cron.schedule('* * * * *', async () => {
    try {
        const users = await User.find({ priority: { $in: [0, 1] } }).sort({ priority: 1 });

        console.log("Twilio calling ");
        for (const user of users) {
            console.log(user._id);
            const tasks = await Task.find({ _id: { $in: user.tasks }, due_date: { $lt: new Date() } });
            const overdueTasks = tasks.filter(task => task.status !== 'DONE');
            
            if (overdueTasks.length > 0) {
                console.log(`Making Twilio voice call to ${user.phone_number} for the user NAMED : ${user.firstName}`);


                // Make Twilio voice call to user's phone number
                await client.calls.create({
                    url: 'http://demo.twilio.com/docs/voice.xml', // URL of TwiML document for voice call
                    to: user.phone_number,
                    from:process.env.TWILIO_PHONE_NUMBER,
                });

                console.log(`Made a Twilio voice call to ${user.phone_number}`);

                // Wait for some time before making the next call
                await new Promise(resolve => setTimeout(resolve, 30000)); // Wait for 30 seconds
            }
        }
    } catch (error) {
        console.error('Error in Twilio voice calling:', error);
    }
});