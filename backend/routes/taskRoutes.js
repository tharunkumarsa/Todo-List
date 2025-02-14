const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Add a task
router.post("/", async (req, res) => {
    const { name } = req.body;
    const newTask = new Task({ name });
    await newTask.save();
    res.json(newTask);
});

// Edit task (fix issue)
router.put("/:id", async (req, res) => {
    const { name } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(updatedTask);
});

// Mark as completed
router.patch("/:id", async (req, res) => {
    const { completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { completed }, { new: true });
    res.json(updatedTask);
});

// Delete task
router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

module.exports = router;
