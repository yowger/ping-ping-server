import { Router } from "express"

import { reminderController } from "../controllers/reminder.controller"
import { validate } from "../middleware/validate.middleware"
import { createReminderSchema } from "../schemas/reminder.schema"

const router = Router()

router.post("/", validate(createReminderSchema), reminderController.create)

export default router
