const express = require("express");
const app = express();

const taskRoutes = require("./routes/Task");
const userRoutes = require("./routes/User");
const subTaskRoutes = require("./routes/SubTask");

const dbConnect = require("./config/database");

const cookieParser = require("cookie-parser");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

dbConnect();

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/subTask", subTaskRoutes);

app.listen(PORT, () => {
    console.log("App running!");
});

// Import and initialize cron jobs
require("./cron/priorityUpdateCron");
require("./cron/twiloCallCron");
require("./cron/twilioMsgCron");

app.get("/", (req, res) => {
    res.send('<h1>This is the home page</h1>');
});
