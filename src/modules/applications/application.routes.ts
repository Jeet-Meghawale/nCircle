import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/zod.validator.middleware";
import { applicationIdParamSchema, createApplicationSchema, UpdateApplicationDTO } from "../../validators/application.validator";
import { asyncHandler } from "../../utils/async.handler";
import { applicationController } from "./application.controller";
import { authorize } from "../../middlewares/rbac.middleware";
import { ApplicationStatus, Role } from "@prisma/client";

const router = Router();

router.use(authMiddleware);
// Get application by Id
router.get(
    "/:id",

    validate(applicationIdParamSchema),
    asyncHandler(applicationController.getApplicationById)
),


// create application
router.post(
    "/create",
    validate(createApplicationSchema),
    asyncHandler(applicationController.createApplication)

)

//update application
router.post(
    "/update/:id",
    validate(applicationIdParamSchema),
    validate(UpdateApplicationDTO),
    authorize(Role.COORDINATOR,Role.ADMIN),
    asyncHandler(applicationController.updateApplication)   
)

//verify application
router.patch(
    "/verify/:id",
    authorize(Role.COORDINATOR),
    validate(applicationIdParamSchema),
    asyncHandler(applicationController.verifyApplication)
)

//aprove application
router.patch(
    "/approve/:id",
    authorize(Role.ADMIN),
    validate(applicationIdParamSchema),
    asyncHandler(applicationController.approveApplication)
)

//cancel application
router.patch(
    "/cancel/:id",
    authorize(Role.COORDINATOR, Role.STUDENT),
    validate(applicationIdParamSchema),
    asyncHandler(applicationController.cancelApplication)
)

//Reject application
router.patch(
    "/reject/:id",
    authorize(Role.ADMIN),
    validate(applicationIdParamSchema),
    asyncHandler(applicationController.rejectApplication)
)
export default router;