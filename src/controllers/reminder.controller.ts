import { Request, Response } from "express"

import { reminderService } from "../services/reminder.service"

import type {
    CreateReminderDto,
    DeleteReminderParams,
    GetReminderParams,
    UpdateReminderDto,
} from "../dto/reminder.dto"

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

    async getById(req: Request<GetReminderParams>, res: Response) {
        const job = await reminderService.getById(req.params.id)

        return res.status(200).json({
            jobId: job.id,
            state: await job.getState(),
            data: job.data,
        })
    }

    async getAll(req: Request, res: Response) {
        const jobs = await reminderService.getAll()

        const reminders = await Promise.all(
            jobs.map(async (job) => ({
                jobId: job.id,
                state: await job.getState(),
                data: job.data,
            })),
        )

        return res.status(200).json(reminders)
    }

    async update(
        req: Request<DeleteReminderParams, {}, UpdateReminderDto>,
        res: Response,
    ) {
        const job = await reminderService.update(req.params.id, req.body)

        return res.status(200).json({
            jobId: job.id,
            data: job.data,
        })
    }
}

export const reminderController = new ReminderController()
