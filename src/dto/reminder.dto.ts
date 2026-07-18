import z from "zod"

import {
    createReminderSchema,
    deleteReminderSchema,
    getReminderSchema,
} from "../schemas/reminder.schema"

export type CreateReminderDto = z.infer<typeof createReminderSchema>

export type DeleteReminderParams = z.infer<typeof deleteReminderSchema>

export type GetReminderParams = z.infer<typeof getReminderSchema>

export const updateReminderSchema = createReminderSchema

export type UpdateReminderDto = z.infer<typeof updateReminderSchema>
