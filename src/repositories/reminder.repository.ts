import { eq } from "drizzle-orm"

import { db } from "../config/db.config"
import { reminders } from "../database/schemas/reminder.schema"
import { CreateReminderQueueDto } from "../dto/reminder-queue.dto"

class ReminderRepository {
    async create(data: CreateReminderQueueDto) {
        const [reminder] = await db
            .insert(reminders)
            .values({
                title: data.title,
                message: data.message,
                scheduledAt: new Date(data.scheduledAt),
                channel: data.channel,
            })
            .returning()

        return reminder
    }

    async getById(id: string) {
        const [reminder] = await db
            .select()
            .from(reminders)
            .where(eq(reminders.id, id))

        return reminder
    }

    async findAll() {
        return db.select().from(reminders)
    }

    async update(id: string, data: CreateReminderQueueDto) {
        const [reminder] = await db
            .update(reminders)
            .set({
                title: data.title,
                message: data.message,
                scheduledAt: new Date(data.scheduledAt),
                channel: data.channel,
                updatedAt: new Date(),
            })
            .where(eq(reminders.id, id))
            .returning()

        return reminder
    }

    async delete(id: string) {
        const [reminder] = await db
            .delete(reminders)
            .where(eq(reminders.id, id))
            .returning()

        return reminder
    }
}

export const reminderRepository = new ReminderRepository()
