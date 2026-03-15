import { Router } from "express";
import { authController } from "./auth.controller";
import { asyncHandler } from "../../utils/async.handler";


const router = Router();

// Post /auth/register
router.post(
    "/register",
    asyncHandler(authController.registerController)
)

// Login /auth/login
router.post(
    "/login",
    asyncHandler(authController.loginController)
)


export default router;