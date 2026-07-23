import { Request, Response } from "express"

import { reminderQueueService } from "../services/reminder-queue.service"

import type {
    CreateReminderQueueDto,
    DeleteReminderQueueParams,
    GetReminderQueueParams,
    UpdateReminderQueueDto,
} from "../dto/reminder-queue.dto"

class ReminderController {
    async create(req: Request<{}, {}, CreateReminderQueueDto>, res: Response) {
        const job = await reminderQueueService.schedule(req.body)

        return res.status(201).json({
            jobId: job.id,
            data: job.data,
        })
    }

    async delete(req: Request<DeleteReminderQueueParams>, res: Response) {
        await reminderQueueService.remove(req.params.id)

        return res.sendStatus(204)
    }

    async getById(req: Request<GetReminderQueueParams>, res: Response) {
        const job = await reminderQueueService.getById(req.params.id)

        return res.status(200).json({
            jobId: job.id,
            state: await job.getState(),
            data: job.data,
        })
    }

    async getAll(req: Request, res: Response) {
        const jobs = await reminderQueueService.getAll()

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
        req: Request<DeleteReminderQueueParams, {}, UpdateReminderQueueDto>,
        res: Response,
    ) {
        const job = await reminderQueueService.reschedule(req.params.id, req.body)

        return res.status(200).json({
            jobId: job.id,
            data: job.data,
        })
    }
}

export const reminderController = new ReminderController()
