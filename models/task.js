const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"], // The allowed values
        default: "pending", // Optional: set a default value
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true, // Optionally, make this required
    },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
