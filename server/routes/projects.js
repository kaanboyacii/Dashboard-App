import express from "express";
import { addProject, deleteProject, getAllProject, getProject, getProjectsByUserId, random, search, updateProject } from "../controllers/project.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllProject)
router.post("/", verifyToken, addProject)
router.put("/:id", verifyToken, updateProject)
router.delete("/:id", verifyToken, deleteProject)
router.get("/find/:id", getProject)
router.get("/findByUser/:userId", getProjectsByUserId)

router.get("/random", random)
router.get("/search", search)

export default router;