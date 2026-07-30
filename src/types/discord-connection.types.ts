import { discordConnections } from "../database/schemas/discord-connection.schema"

export interface CreateDiscordConnectionInput {
    code: string
    guildId: string
}

export interface CreateDiscordConnectionData {
    userId: string
    discordUserId: string
    guildId: string
    accessToken: string
    refreshToken: string
    expiresAt: Date
}

export interface DiscordConnectionUpdateData {
    guildId: string
    channelId: string
    accessToken: string
    refreshToken: string
    expiresAt: Date
}

export type UpdateDiscordConnectionInput = Partial<DiscordConnectionUpdateData>

export type DiscordConnection = typeof discordConnections.$inferSelect

export type NewDiscordConnection = typeof discordConnections.$inferInsert
