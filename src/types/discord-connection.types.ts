import { discordConnections } from "../database/schemas/discord-connection.schema"

export interface CreateDiscordConnectionInput {
    code: string
    guildId: string
}

export interface CreateDiscordConnectionData {
    discordUserId: string
    guildId: string
    accessToken: string
    refreshToken: string
    expiresAt: Date
}

export interface UpdateDiscordConnectionInput {
    guildId?: string
    channelId?: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: Date
}

export type DiscordConnection = typeof discordConnections.$inferSelect

export type NewDiscordConnection = typeof discordConnections.$inferInsert
