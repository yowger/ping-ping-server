import { reminderQueue } from "../queues/reminder.queue"
import { getDelayUntil } from "../utils/date.utils"

import { NotFoundError } from "../errors/not-found.error"
import { SEND_REMINDER_JOB } from "../constants/queue.constants"

import type { ReminderJob, ReminderQueueData } from "../types/reminder.types"

class ReminderQueueService {
    private async addJob(data: ReminderQueueData): Promise<ReminderJob> {
        const delay = getDelayUntil(data.scheduledAt)

        return reminderQueue.add(SEND_REMINDER_JOB, data, {
            delay,
            removeOnComplete: 100,
            removeOnFail: 100,
            // removeOnComplete: true,
            // removeOnFail: true,
        })
    }

    async schedule(data: ReminderQueueData): Promise<ReminderJob> {
        return this.addJob(data)
    }

    async remove(jobId: string): Promise<string> {
        const job = await reminderQueue.getJob(jobId)

        if (!job) {
            throw new NotFoundError("Reminder job not found.")
        }

        await job.remove()

        return jobId
    }

    async getById(jobId: string): Promise<ReminderJob> {
        const job = await reminderQueue.getJob(jobId)

        if (!job) {
            throw new NotFoundError("Reminder job not found.")
        }

        return job
    }

    async getAll(): Promise<ReminderJob[]> {
        return reminderQueue.getJobs([
            "waiting",
            "delayed",
            "active",
            "completed",
            "failed",
        ])
    }

    async reschedule(
        jobId: string,
        data: ReminderQueueData,
    ): Promise<ReminderJob> {
        const job = await reminderQueue.getJob(jobId)

        if (!job) {
            throw new NotFoundError("Reminder job not found.")
        }

        await job.remove()

        return this.addJob(data)
    }
}

export const reminderQueueService = new ReminderQueueService()
