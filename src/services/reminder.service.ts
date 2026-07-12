import { reminderQueue } from "../queues/reminder.queue"

import type { CreateReminderDto } from "../schemas/reminder.schema"

class ReminderService {
    async create(data: CreateReminderDto) {
        const job = await reminderQueue.add("send-reminder", data)

        return job
    }
}

export const reminderService = new ReminderService()
