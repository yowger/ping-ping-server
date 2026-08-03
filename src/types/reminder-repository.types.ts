import { reminders } from "../database/schemas/reminder.schema"

export interface ReminderInput {
    discordConnectionId: string
    title: string
    message: string
    scheduledAt: string
}

export interface UpdateReminderInput {
    title: string
    message: string
    scheduledAt: string
}

export type Reminder = typeof reminders.$inferSelect
