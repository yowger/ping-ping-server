import { Request, Response } from "express"

import { reminderService } from "../services/reminder.service"

import type {
    CreateReminderDto,
    DeleteReminderParams,
    GetReminderParams,
    ReminderResponseDto,
    UpdateReminderDto,
} from "../dto/reminder.dto"

class ReminderController {
    async create(
        req: Request<{}, {}, CreateReminderDto>,
        res: Response<ReminderResponseDto>,
    ) {
        const reminder = await reminderService.create(req.user.id, req.body)

        return res.status(201).json(reminder)
    }

    async getAll(req: Request, res: Response<ReminderResponseDto[]>) {
        const reminders = await reminderService.getAll(req.user.id)

        return res.status(200).json(reminders)
    }

    async getById(
        req: Request<GetReminderParams>,
        res: Response<ReminderResponseDto>,
    ) {
        const reminder = await reminderService.getById(
            req.user.id,
            req.params.id,
        )

        return res.status(200).json(reminder)
    }

    async update(
        req: Request<GetReminderParams, {}, UpdateReminderDto>,
        res: Response<ReminderResponseDto>,
    ) {
        const reminder = await reminderService.update(
            req.user.id,
            req.params.id,
            req.body,
        )

        return res.status(200).json(reminder)
    }

    async delete(req: Request<DeleteReminderParams>, res: Response) {
        await reminderService.delete(req.user.id, req.params.id)

        return res.sendStatus(204)
    }
}

export const reminderController = new ReminderController()
