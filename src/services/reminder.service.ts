import { reminderRepository } from "../repositories/reminder.repository"
import { reminderQueueService } from "./reminder-queue.service"

import type { Reminder } from "../types/reminder-repository.types"
import type { ReminderInput } from "../types/reminder.types"

class ReminderService {
    async create(data: ReminderInput): Promise<Reminder> {
        const reminder = await reminderRepository.create(data)

        const job = await reminderQueueService.schedule({
            ...data,
            reminderId: reminder.id,
        })

        await reminderRepository.updateBullJobId(reminder.id, job.id!)

        return reminder
    }

    async getById(id: string): Promise<Reminder> {
        const reminder = await reminderRepository.getById(id)

        if (!reminder) {
            throw new Error("Reminder not found.")
        }

        return reminder
    }

    async getAll(): Promise<Reminder[]> {
        return reminderRepository.findAll()
    }

    async update(id: string, data: ReminderInput): Promise<Reminder> {
        const reminder = await reminderRepository.getById(id)

        if (!reminder) {
            throw new Error("Reminder not found.")
        }

        if (reminder.bullJobId) {
            const job = await reminderQueueService.reschedule(
                reminder.bullJobId,
                {
                    ...data,
                    reminderId: reminder.id,
                },
            )

            await reminderRepository.updateBullJobId(reminder.id, job.id!)
        }

        const updatedReminder = await reminderRepository.update(id, data)

        if (!updatedReminder) {
            throw new Error("Reminder not found.")
        }

        return updatedReminder
    }

    async delete(id: string): Promise<string> {
        const reminder = await reminderRepository.getById(id)

        if (!reminder) {
            throw new Error("Reminder not found.")
        }

        if (reminder.bullJobId) {
            await reminderQueueService.remove(reminder.bullJobId)
        }

        await reminderRepository.delete(id)

        return id
    }
}

export const reminderService = new ReminderService()
