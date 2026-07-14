import { Router } from "express"

import { reminderController } from "../controllers/reminder.controller"
import { validate } from "../middleware/validate.middleware"
import {
    createReminderSchema,
    deleteReminderSchema,
} from "../schemas/reminder.schema"

const router = Router()

router.post("/", validate(createReminderSchema), reminderController.create)
router.delete(
    "/reminders/:id",
    validate(deleteReminderSchema, "params"),
    reminderController.delete,
)

export default router
