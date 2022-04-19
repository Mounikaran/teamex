import Task from '../models/task.js';
import User from '../models/user.js';
import { TASK_STATUS } from '../utils/constants.js'

export const getTaskById = async (req, res) => {
    console.log("getTaskById");
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const filterTask = async (req, res) => {
    console.log("filterTask", req.body);
    const filterData = req.body;
    try {
        const tasks = await Task.find({...filterData});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    console.log("createTask");
    const dataToAdd = req.body;
    if(dataToAdd.assignedTo) {
        const user = await User.findById(dataToAdd.assignedTo);
        if(user)
            dataToAdd.ownerName = user.name;
    }
    try {
        const task = new Task({...dataToAdd});
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    console.log("updateTask", req.body);
    const { id } = req.params;
    const dataToUpdate = req.body
    if(dataToUpdate.assignedTo) {
        dataToUpdate.ownerName = dataToUpdate.assignedTo.name;
    }
    try {
        const task = await Task.findByIdAndUpdate(id, {...dataToUpdate}, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    console.log("deleteTask");
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTaskStatus = async (req, res) => {
    console.log("getTaskStatus");
    res.status(200).json({taskStatus : TASK_STATUS});
}