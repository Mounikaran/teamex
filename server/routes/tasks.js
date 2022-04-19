import express from "express";
import {
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    filterTask,
    getTaskStatus
} from "../controllers/tasks.js";

const router = express.Router();

router.post("/filter", filterTask);
router.get("/task/:id", getTaskById);
router.post("/task", createTask);
router.post("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

router.get("/status", getTaskStatus);

export default router;
