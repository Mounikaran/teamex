import express from "express";
import {
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    filterTask,
} from "../controllers/tasks.js";

const router = express.Router();

router.get("/filter", filterTask);
router.get("/task/:id", getTaskById);
router.post("/task", createTask);
router.post("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
