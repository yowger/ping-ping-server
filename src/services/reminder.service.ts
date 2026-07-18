import { getDelayUntil } from "../utils/date.utils"
import { reminderQueue } from "../queues/reminder.queue"

import type { CreateReminderDto } from "../schemas/reminder.schema"

class ReminderService {
    async create(data: CreateReminderDto) {
        const delay = getDelayUntil(data.scheduledAt)

        const job = await reminderQueue.add("send-reminder", data, {
            delay,
        })

        // console.log("job counts:", await reminderQueue.getJobCounts())

        return job
    }

    async delete(jobId: string) {
        const job = await reminderQueue.getJob(jobId)

        if (!job) {
            throw new Error("Reminder not found.")
        }

        await job.remove()

        return jobId
    }

    async getById(jobId: string) {
        const job = await reminderQueue.getJob(jobId)

        if (!job) {
            throw new Error("Reminder not found.")
        }

        return job
    }

    async getAll() {
        return reminderQueue.getJobs([
            "waiting",
            "delayed",
            "active",
            "completed",
            "failed",
        ])
    }

    async update(jobId: string, data: CreateReminderDto) {
        const job = await reminderQueue.getJob(jobId)

        if (!job) {
            throw new Error("Reminder not found.")
        }

        await job.remove()

        const delay = getDelayUntil(data.scheduledAt)

        return reminderQueue.add("send-reminder", data, {
            delay,
            removeOnComplete: 100,
            removeOnFail: 100,
            // removeOnComplete: true,
            // removeOnFail: true,
        })
    }
}

export const reminderService = new ReminderService()

