import { Router } from "express"

import { reminderController } from "../controllers/reminder.controller"
import { validate } from "../middleware/validate.middleware"
import {
    createReminderSchema,
    deleteReminderSchema,
    getReminderSchema,
    updateReminderSchema,
} from "../schemas/reminder.schema"

const router = Router()

router.post("/", validate(createReminderSchema), reminderController.create)

router.get("/", reminderController.getAll)

router.get(
    "/:id",
    validate(getReminderSchema, "params"),
    reminderController.getById,
)

router.patch(
    "/:id",
    validate(deleteReminderSchema, "params"),
    validate(updateReminderSchema),
    reminderController.update,
)

router.delete(
    "/:id",
    validate(deleteReminderSchema, "params"),
    reminderController.delete,
)

export default router
