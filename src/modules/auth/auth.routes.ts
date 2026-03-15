import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// Post /auth/register
router.post("/register",authController.registerController)


export default router;