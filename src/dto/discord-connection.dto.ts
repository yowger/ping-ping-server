import { z } from "zod"

import {
    connectDiscordSchema,
    deleteDiscordConnectionSchema,
    getDiscordConnectionSchema,
    getDiscordConnectionByGuildSchema,
    updateDiscordChannelSchema,
} from "../schemas/discord-connection.schema"

export type ConnectDiscordDto = z.infer<typeof connectDiscordSchema>

export type UpdateDiscordChannelDto = z.infer<typeof updateDiscordChannelSchema>

export type GetDiscordConnectionParams = z.infer<
    typeof getDiscordConnectionSchema
>

export type GetDiscordConnectionByGuildParams = z.infer<
    typeof getDiscordConnectionByGuildSchema
>

export type DeleteDiscordConnectionParams = z.infer<
    typeof deleteDiscordConnectionSchema
>

export interface DiscordConnectionResponseDto {
    id: string
    userId: string
    discordUserId: string
    guildId: string | null
    channelId: string | null
    accessToken: string
    refreshToken: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
}

export type ConnectDiscordResponseDto = DiscordConnectionResponseDto
