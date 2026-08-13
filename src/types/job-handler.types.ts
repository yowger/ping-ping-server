import type { Job } from "bullmq"
import type { ReminderQueueData } from "../types/reminder.types"

export type ReminderJob = Job<ReminderQueueData>

export type JobHandler = (job: ReminderJob) => Promise<void>
