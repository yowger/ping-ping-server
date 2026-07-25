import { discordConnections } from "../database/schemas/discord-connection.schema"

export interface ConnectDiscordInput {
    code: string
    guildId: string
    channelId: string
}

export interface DiscordConnectionInput {
    discordUserId: string
    guildId: string
    channelId: string
    accessToken: string
    refreshToken: string
    expiresAt: Date
}

export interface UpdateDiscordConnectionInput {
    channelId?: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: Date
}

export type DiscordConnection = typeof discordConnections.$inferSelect

export type NewDiscordConnection = typeof discordConnections.$inferInsert
