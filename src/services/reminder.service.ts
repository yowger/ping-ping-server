import { getDelayUntil } from "../utils/date.utils"
import { reminderQueue } from "../queues/reminder.queue"

import type { CreateReminderDto } from "../schemas/reminder.schema"

class ReminderService {
    async create(data: CreateReminderDto) {
        const delay = getDelayUntil(data.scheduledAt)

        const job = await reminderQueue.add("send-reminder", data, {
            delay,
        })

        console.log("job counts:", await reminderQueue.getJobCounts())

        return job
    }
}

export const reminderService = new ReminderService()
