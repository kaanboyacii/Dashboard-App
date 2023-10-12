import express from "express";
import { addOrder, deleteOrder, getAllOrder, getOrdersByUserId } from "../controllers/order.js";
import { verifyToken } from "../utility/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllOrder)
router.post("/", verifyToken, addOrder)
router.delete("/:id", verifyToken, deleteOrder)
router.get("/findByUser/:userId", verifyToken, getOrdersByUserId)

export default router;