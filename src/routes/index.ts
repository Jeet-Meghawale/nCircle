import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import projectRoutes from "../modules/projects/project.routes"
const router = Router();

router.use("/auth", authRoutes);
router.use("/project",projectRoutes)

export default router;