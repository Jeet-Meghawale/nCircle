import { Router } from "express";
import { authorize } from "../../middlewares/rbac.middleware";
import { validate } from "../../middlewares/zod.validator.middleware";
import { createProjectSchema, updateProjectSchema } from "../../validators/project.validator";
import { projectController } from "./project.controller";
import { Role } from "@prisma/client";
import { asyncHandler } from "../../utils/async.handler";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

// List Project Admin
router.get(
    "/list-admin",
    authorize(Role.ADMIN),
    asyncHandler( projectController.listProjectsAdmin)
)


// List Project stud,coor
router.get(
    "/list",
   asyncHandler( projectController.listProjects)
)


// create Project
router.post(
    "/create",
    authorize("ADMIN"),
    validate(createProjectSchema),
    asyncHandler(projectController.createProject)
)


// Update Project details + status Remark
router.patch(
    "/update/:id",
    authorize(Role.ADMIN),
    validate(updateProjectSchema),
    asyncHandler(projectController.updateProject)
)

// Toggle visibility of project + status Remark

router.patch(
    "/toggle-visibility/:id",
    authorize(Role.ADMIN),
    asyncHandler(projectController.toggleVisibility)
)

// get Project by Id admin

router.get(
    "/admin/:id",
    authorize(Role.ADMIN),
    asyncHandler(projectController.getProjectByIdAdmin)
)

// get Project by id (visible only)
router.get(
    "/id",
    asyncHandler(projectController.listVisible)
)

// count of all Project

// count of listed Projects


export default router;