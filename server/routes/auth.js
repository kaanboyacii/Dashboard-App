import express from "express";
import { logout, signin, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup",signup)
router.post("/signin",signin)
router.post("/logout",logout)

export default router;