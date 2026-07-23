import { z } from "zod"

import {
    createReminderSchema,
    deleteReminderSchema,
    getReminderSchema,
} from "../schemas/reminder.schema"
import { Reminder } from "../types/reminder.types"

export type CreateReminderDto = z.infer<typeof createReminderSchema>
export type UpdateReminderDto = CreateReminderDto

export type DeleteReminderParams = z.infer<typeof deleteReminderSchema>
export type GetReminderParams = z.infer<typeof getReminderSchema>

export type ReminderResponseDto = Reminder
