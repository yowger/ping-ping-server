import { z } from "zod"

import {
    discordCallbackSchema,
    getGuildChannelsSchema,
    sendDiscordMessageSchema,
} from "../schemas/discord.schema"

import type {
    DiscordGuild,
    DiscordToken,
    DiscordUser,
    GuildChannel,
} from "../types/discord.types"

export type DiscordCallbackQuery = z.infer<typeof discordCallbackSchema>

export type GetGuildChannelsParams = z.infer<typeof getGuildChannelsSchema>

export interface DiscordInviteUrlResponseDto {
    url: string
}

export type SendDiscordMessageDto = z.infer<typeof sendDiscordMessageSchema>

export interface DiscordMessageResponseDto {
    message: string
}

export interface DiscordInviteUrlResponseDto {
    url: string
}

export type DiscordCallbackResponseDto = DiscordToken

export type DiscordCurrentUserResponseDto = DiscordUser

export type DiscordGuildsResponseDto = DiscordGuild[]

export type DiscordChannelsResponseDto = GuildChannel[]
