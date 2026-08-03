import type { Job } from "bullmq"

import { reminders } from "../database/schemas/reminder.schema"

export interface ReminderInput {
    title: string
    message: string
    scheduledAt: string
}

export interface ReminderQueueData extends ReminderInput {
    reminderId: string
}

export type Reminder = typeof reminders.$inferSelect

export type ReminderJob = Job<ReminderQueueData>
