const express = require("express");
const mongoose = require("mongoose");
const app = express();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./db/connect");
app.use(express.json());

connectDB();
app.use("/api/tasks", taskRoutes);
app.use("/auth", authRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
