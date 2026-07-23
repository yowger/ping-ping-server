import { CreateReminderQueueDto } from "../dto/reminder-queue.dto"
import { reminderQueue } from "../queues/reminder.queue"
import { getDelayUntil } from "../utils/date.utils"

class ReminderQueueService {
    private async addJob(data: CreateReminderQueueDto) {
        const delay = getDelayUntil(data.scheduledAt)

        return reminderQueue.add("send-reminder", data, {
            delay,
            removeOnComplete: 100,
            removeOnFail: 100,
            // removeOnComplete: true,
            // removeOnFail: true,
        })
    }

    async schedule(data: CreateReminderQueueDto) {
        return this.addJob(data)
    }

    async remove(jobId: string) {
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

    async reschedule(jobId: string, data: CreateReminderQueueDto) {
        const job = await reminderQueue.getJob(jobId)

        if (!job) {
            throw new Error("Reminder not found.")
        }

        await job.remove()

        return this.addJob(data)
    }
}

export const reminderQueueService = new ReminderQueueService()
