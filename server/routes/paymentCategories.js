import express from "express";
import {
  getAllPaymentCategoriesForProject,
  createPaymentCategory,
  updatePaymentCategory,
  deletePaymentCategory,
} from "../controllers/paymentCategory.js";

const router = express.Router();

router.get("/:projectId", getAllPaymentCategoriesForProject);
router.post("/", createPaymentCategory);
router.put("/:id", updatePaymentCategory);
router.delete("/:id", deletePaymentCategory);

export default router;
