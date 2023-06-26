import express from "express";
import { addProject, deleteProject, getAllProject, getProject, getProjectsByUserId, random, search, updateProject , deletePayment, deleteCost, addCostsCategory, addPaymentsCategory} from "../controllers/project.js";
import { verifyToken } from "../utility/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllProject)
router.post("/", verifyToken, addProject)
router.put("/:id", verifyToken, updateProject)
router.delete("/:id", verifyToken, deleteProject)
router.delete("/:id/payments/:paymentId", verifyToken, deletePayment);
router.delete("/:id/costs/:costId", verifyToken, deleteCost);
router.get("/find/:id", getProject)
router.get("/findByUser/:userId", getProjectsByUserId)
router.post("/add-costs-category/:id", verifyToken, addCostsCategory)
router.post("/add-payments-category/:id", verifyToken, addPaymentsCategory)
router.get("/random", random)
router.get("/search", search)

export default router;