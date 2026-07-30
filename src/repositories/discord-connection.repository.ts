import { eq } from "drizzle-orm"

import { db } from "../config/db.config"
import { discordConnections } from "../database/schemas/discord-connection.schema"

import type {
    CreateDiscordConnectionData,
    DiscordConnection,
    UpdateDiscordConnectionInput,
} from "../types/discord-connection.types"

class DiscordConnectionRepository {
    async create(
        data: CreateDiscordConnectionData,
    ): Promise<DiscordConnection> {
        const [connection] = await db
            .insert(discordConnections)
            .values(data)
            .returning()

        return connection
    }

    async getById(id: string): Promise<DiscordConnection | undefined> {
        const [connection] = await db
            .select()
            .from(discordConnections)
            .where(eq(discordConnections.id, id))

        return connection
    }

    async getByUserId(userId: string): Promise<DiscordConnection | undefined> {
        const [connection] = await db
            .select()
            .from(discordConnections)
            .where(eq(discordConnections.userId, userId))

        return connection
    }

    async getByGuildId(
        guildId: string,
    ): Promise<DiscordConnection | undefined> {
        const [connection] = await db
            .select()
            .from(discordConnections)
            .where(eq(discordConnections.guildId, guildId))

        return connection
    }

    async getByDiscordUserId(
        discordUserId: string,
    ): Promise<DiscordConnection | undefined> {
        const [connection] = await db
            .select()
            .from(discordConnections)
            .where(eq(discordConnections.discordUserId, discordUserId))

        return connection
    }

    async findAll(): Promise<DiscordConnection[]> {
        return db.select().from(discordConnections)
    }

    async update(
        id: string,
        data: UpdateDiscordConnectionInput,
    ): Promise<DiscordConnection | undefined> {
        const [connection] = await db
            .update(discordConnections)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(eq(discordConnections.id, id))
            .returning()

        return connection
    }

    async delete(id: string): Promise<DiscordConnection | undefined> {
        const [connection] = await db
            .delete(discordConnections)
            .where(eq(discordConnections.id, id))
            .returning()

        return connection
    }
}

export const discordConnectionRepository = new DiscordConnectionRepository()
