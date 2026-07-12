import { Request, Response } from "express"

import { reminderService } from "../services/reminder.service"

class ReminderController {
    async create(req: Request, res: Response) {
        const job = await reminderService.create(req.body)

        return res.status(201).json({
            jobId: job.id,
            data: job.data,
        })
    }
}

export const reminderController = new ReminderController()
