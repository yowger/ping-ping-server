import z from "zod"

import {
    createReminderQueueSchema,
    deleteReminderQueueSchema,
    getReminderQueueSchema,
} from "../schemas/reminder-queue.schema"

export type CreateReminderQueueDto = z.infer<typeof createReminderQueueSchema>

export type DeleteReminderQueueParams = z.infer<typeof deleteReminderQueueSchema>

export type GetReminderQueueParams = z.infer<typeof getReminderQueueSchema>

export const updateReminderSchema = createReminderQueueSchema

export type UpdateReminderQueueDto = z.infer<typeof updateReminderSchema>
