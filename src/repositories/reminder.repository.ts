import { eq } from "drizzle-orm"

import { db } from "../config/db.config"
import { reminders } from "../database/schemas/reminder.schema"

import type { Reminder, ReminderInput } from "../types/reminder-repository.types"

class ReminderRepository {
    async create(data: ReminderInput): Promise<Reminder> {
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

    async getById(id: string): Promise<Reminder | undefined> {
        const [reminder] = await db
            .select()
            .from(reminders)
            .where(eq(reminders.id, id))

        return reminder
    }

    async findAll(): Promise<Reminder[]> {
        return db.select().from(reminders)
    }

    async update(
        id: string,
        data: ReminderInput,
    ): Promise<Reminder | undefined> {
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

    async delete(id: string): Promise<Reminder | undefined> {
        const [reminder] = await db
            .delete(reminders)
            .where(eq(reminders.id, id))
            .returning()

        return reminder
    }

    async updateBullJobId(
        id: string,
        bullJobId: string,
    ): Promise<Reminder | undefined> {
        const [reminder] = await db
            .update(reminders)
            .set({
                bullJobId,
                updatedAt: new Date(),
            })
            .where(eq(reminders.id, id))
            .returning()

        return reminder
    }
}

export const reminderRepository = new ReminderRepository()
