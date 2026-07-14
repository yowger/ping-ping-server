import { Request, Response } from "express"

import { reminderService } from "../services/reminder.service"

import type {
    CreateReminderDto,
    DeleteReminderParams,
} from "../schemas/reminder.schema"

class ReminderController {
    async create(req: Request<{}, {}, CreateReminderDto>, res: Response) {
        const job = await reminderService.create(req.body)

        return res.status(201).json({
            jobId: job.id,
            data: job.data,
        })
    }

    async delete(req: Request<DeleteReminderParams>, res: Response) {
        await reminderService.delete(req.params.id)

        return res.sendStatus(204)
    }
}

export const reminderController = new ReminderController()
