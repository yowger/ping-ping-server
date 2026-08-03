import { Router } from "express"

import { reminderController } from "../controllers/reminder.controller"
import { validate } from "../middleware/validate.middleware"
import { requireAuth } from "../middleware/require-auth.middleware"
import {
    createReminderSchema,
    reminderIdParamsSchema,
    updateReminderSchema,
} from "../schemas/reminder.schema"

const router = Router()

router.post(
    "/",
    requireAuth,
    validate(createReminderSchema),
    reminderController.create,
)

router.get("/", requireAuth, reminderController.getAll)

router.get(
    "/:id",
    requireAuth,
    validate(reminderIdParamsSchema, "params"),
    reminderController.getById,
)

router.patch(
    "/:id",
    requireAuth,
    validate(reminderIdParamsSchema, "params"),
    validate(updateReminderSchema),
    reminderController.update,
)

router.delete(
    "/:id",
    requireAuth,
    validate(reminderIdParamsSchema, "params"),
    reminderController.delete,
)

export default router
