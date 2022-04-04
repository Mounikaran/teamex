import express from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  deleteProject,
  updateProject,
} from "../controllers/projects.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/project", createProject);
router.get("/project/:id", getProjectById);
router.post("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

export default router;
