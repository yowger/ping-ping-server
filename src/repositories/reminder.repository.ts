import { and, eq } from "drizzle-orm"

import { db } from "../config/db.config"
import { reminders } from "../database/schemas/reminder.schema"

import type {
    Reminder,
    ReminderInput,
    UpdateReminderInput,
} from "../types/reminder-repository.types"

class ReminderRepository {
    async create(data: ReminderInput): Promise<Reminder> {
        const [reminder] = await db
            .insert(reminders)
            .values({
                discordConnectionId: data.discordConnectionId,
                title: data.title,
                message: data.message,
                scheduledAt: new Date(data.scheduledAt),
            })
            .returning()

        return reminder
    }

    async findByDiscordConnectionId(
        discordConnectionId: string,
    ): Promise<Reminder[]> {
        return db
            .select()
            .from(reminders)
            .where(eq(reminders.discordConnectionId, discordConnectionId))
    }

    async getByIdAndDiscordConnectionId(
        id: string,
        discordConnectionId: string,
    ): Promise<Reminder | undefined> {
        const [reminder] = await db
            .select()
            .from(reminders)
            .where(
                and(
                    eq(reminders.id, id),
                    eq(reminders.discordConnectionId, discordConnectionId),
                ),
            )

        return reminder
    }

    async getById(id: string): Promise<Reminder | undefined> {
        const [reminder] = await db
            .select()
            .from(reminders)
            .where(eq(reminders.id, id))

        return reminder
    }

    async update(
        id: string,
        data: UpdateReminderInput,
    ): Promise<Reminder | undefined> {
        const [reminder] = await db
            .update(reminders)
            .set({
                title: data.title,
                message: data.message,
                scheduledAt: new Date(data.scheduledAt),
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

    async updateJobId(
        id: string,
        jobId: string,
    ): Promise<Reminder | undefined> {
        const [reminder] = await db
            .update(reminders)
            .set({
                jobId,
                updatedAt: new Date(),
            })
            .where(eq(reminders.id, id))
            .returning()

        return reminder
    }
}

export const reminderRepository = new ReminderRepository()
