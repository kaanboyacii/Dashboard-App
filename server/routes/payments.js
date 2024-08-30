import express from "express";
import { addPayment, updatePayment, deletePayment, getPayments, getPaymentsByUserId } from "../controllers/payment.js";

const router = express.Router();

router.post("/", addPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);
router.get("/:projectId", getPayments);
router.get("/user/:userId", getPaymentsByUserId);

export default router;
