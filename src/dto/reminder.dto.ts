import { z } from "zod"

import {
    createReminderSchema,
    reminderIdParamsSchema,
} from "../schemas/reminder.schema"
import { Reminder } from "../types/reminder.types"

export type CreateReminderDto = z.infer<typeof createReminderSchema>
export type UpdateReminderDto = CreateReminderDto

export type DeleteReminderParams = z.infer<typeof reminderIdParamsSchema>
export type GetReminderParams = z.infer<typeof reminderIdParamsSchema>

export type ReminderResponseDto = Reminder
