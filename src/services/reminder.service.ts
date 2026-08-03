import { reminderRepository } from "../repositories/reminder.repository"
import { reminderQueueService } from "./reminder-queue.service"

import { NotFoundError } from "../errors/not-found.error"
import { discordConnectionService } from "./discord-connection.service"

import type {
    Reminder,
    UpdateReminderInput,
} from "../types/reminder-repository.types"
import type { ReminderInput } from "../types/reminder.types"

class ReminderService {
    async create(userId: string, data: ReminderInput): Promise<Reminder> {
        const connection = await discordConnectionService.getByUserId(userId)

        const reminder = await reminderRepository.create({
            ...data,
            discordConnectionId: connection.id,
        })

        const job = await reminderQueueService.schedule({
            ...data,
            reminderId: reminder.id,
        })

        await reminderRepository.updateJobId(reminder.id, job.id!)

        return reminder
    }

    async getById(userId: string, id: string): Promise<Reminder> {
        const connection = await discordConnectionService.getByUserId(userId)

        const reminder = await reminderRepository.getByIdAndDiscordConnectionId(
            id,
            connection.id,
        )

        if (!reminder) {
            throw new NotFoundError("Reminder not found.")
        }

        return reminder
    }

    async getAll(userId: string): Promise<Reminder[]> {
        const connection = await discordConnectionService.getByUserId(userId)

        return reminderRepository.findByDiscordConnectionId(connection.id)
    }

    async update(
        userId: string,
        id: string,
        data: UpdateReminderInput,
    ): Promise<Reminder> {
        const reminder = await this.getById(userId, id)

        if (reminder.jobId) {
            const job = await reminderQueueService.reschedule(reminder.jobId, {
                ...data,
                reminderId: reminder.id,
            })

            await reminderRepository.updateJobId(reminder.id, job.id!)
        }

        const updatedReminder = await reminderRepository.update(id, data)

        if (!updatedReminder) {
            throw new NotFoundError("Reminder not found.")
        }

        return updatedReminder
    }

    async delete(userId: string, id: string): Promise<string> {
        const reminder = await this.getById(userId, id)

        if (reminder.jobId) {
            await reminderQueueService.remove(reminder.jobId)
        }

        await reminderRepository.delete(id)

        return id
    }
}

export const reminderService = new ReminderService()
