import express from "express";
import {
  getAllCostCategoriesForProject,
  createCostCategory,
  updateCostCategory,
  deleteCostCategory,
} from "../controllers/costCategory.js";

const router = express.Router();

router.get("/:projectId", getAllCostCategoriesForProject);
router.post("/", createCostCategory);
router.put("/:id", updateCostCategory);
router.delete("/:id", deleteCostCategory);

export default router;
