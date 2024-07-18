import express from "express";
import { addCost, updateCost, deleteCost, getCosts } from "../controllers/cost.js";

const router = express.Router();

router.post("/", addCost);
router.put("/:id", updateCost);
router.delete("/:id", deleteCost);
router.get("/:projectId", getCosts);

export default router;
