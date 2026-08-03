import { Router } from "express"

import { reminderController } from "../controllers/reminder.controller"
import { validate } from "../middleware/validate.middleware"
import {
    createReminderQueueSchema,
    reminderIdParamsSchema,
} from "../schemas/reminder-queue.schema"
import { requireAuth } from "../middleware/require-auth.middleware"

const router = Router()

router.post(
    "/",
    requireAuth,
    validate(createReminderQueueSchema),
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
    reminderController.update,
)

router.delete(
    "/:id",
    requireAuth,
    validate(reminderIdParamsSchema, "params"),
    reminderController.delete,
)

export default router
