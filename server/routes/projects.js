import express from "express";
import {
  createProject,
  getAllProjectsByUserId,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.js";

const router = express.Router();

router.post("/", createProject);
router.get("/:userId", getAllProjectsByUserId);
router.get("/project/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
