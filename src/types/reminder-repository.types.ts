import { reminders } from "../database/schemas/reminder.schema"

export interface ReminderInput {
    title: string
    message: string
    scheduledAt: string
    channel: "discord"
}

export type Reminder = typeof reminders.$inferSelect
