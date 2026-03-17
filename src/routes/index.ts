import { application, Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import projectRoutes from "../modules/projects/project.routes"
import applicationRoutes from "../modules/applications/application.routes"

const router = Router();

router.use("/auth", authRoutes);
router.use("/project",projectRoutes)
router.use("/application",applicationRoutes)

export default router;