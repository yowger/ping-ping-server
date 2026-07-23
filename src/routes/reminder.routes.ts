import { Router } from "express"

import { reminderController } from "../controllers/reminder.controller"
import { validate } from "../middleware/validate.middleware"
import {
    createReminderQueueSchema,
    deleteReminderQueueSchema,
    getReminderQueueSchema,
    updateReminderQueueSchema,
} from "../schemas/reminder-queue.schema"

const router = Router()

router.post("/", validate(createReminderQueueSchema), reminderController.create)

router.get("/", reminderController.getAll)

router.get(
    "/:id",
    validate(getReminderQueueSchema, "params"),
    reminderController.getById,
)

router.patch(
    "/:id",
    validate(deleteReminderQueueSchema, "params"),
    validate(updateReminderQueueSchema),
    reminderController.update,
)

router.delete(
    "/:id",
    validate(deleteReminderQueueSchema, "params"),
    reminderController.delete,
)

export default router
