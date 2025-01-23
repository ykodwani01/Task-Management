const { request } = require("express");
const Task = require("../models/task");
const User = require("../models/user");

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json({ tasks, status: true, msg: "Success" });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ status: false, msg: "Internal Server Error" });
    }
};

const getTask = async (req, res) => {
    try {
        const temp=await User.findOne({_id: req.user._id});
        const tasks = await Task.findOne({
            _id: req.params.taskid, // Task ID from params
            user: temp, // User ID from the authenticated user
        });
        res.status(200).json({ tasks, status: true, msg: "Success" });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ status: false, msg: "Internal Server Error" });
    }
};
const postTask = async (req, res) => {
    try {
        //apply validation here
        const { title, desc, status } = req.body;
        console.log(title);
        console.log(status);
        if (!title || !desc || !status) {
            return res
                .status(400)
                .json({ status: false, msg: "Missing required fields" });
        }
        if (
            status != "pending" &&
            status != "in-progress" &&
            status != "completed"
        ) {
            return res
                .status(400)
                .json({ status: false, msg: "Invalid status" });
        }
        req.body.user = req.user._id;
        const tasks = await Task.insertMany([req.body]);
        res.status(200).json({ tasks, status: true, msg: "Success" });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ status: false, msg: "Internal Server Error" });
    }
};
const deleteTask = async (req, res) => {
    try {
        
        const temp=await User.findOne({_id: req.user._id});
        const task = await Task.findOneAndDelete({
            _id: req.params.taskid, // Task ID from params
            user: temp, // User ID from the authenticated user
        });
        res.status(200).json({status: true, msg: "Success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            msg: "Internal Server Error or ID not found",
        });
    }
};
const putTask = async (req, res) => {
    try {
        //apply validation here
        const { title, desc, status } = req.body;
        const updated_at = Date.now();
        if (!title || !desc || !status) {
            return res
                .status(400)
                .json({ status: false, msg: "Missing required fields" });
        }
        if (
            status != "pending" &&
            status != "in-progress" &&
            status != "completed"
        ) {
            return res
                .status(400)
                .json({ status: false, msg: "Invalid status" });
        }
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskid, // Find task by taskId
            { title, desc, status, updated_at }, // Fields to update
            { new: true }, // Ensure the updated task is returned
        );
        console.log(req.params.taskid);
        console.log(req.body);
        if (!updatedTask) {
            return res
                .status(404)
                .json({ status: false, msg: "Task not found" });
        }
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ status: false, msg: "Internal Server Error" });
    }
};
module.exports = { getTask, getTasks, postTask, deleteTask, putTask };
