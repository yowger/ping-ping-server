import { Router } from "express"

import { reminderController } from "../controllers/reminder.controller"

const router = Router()

router.post("/", reminderController.create)

export default router
