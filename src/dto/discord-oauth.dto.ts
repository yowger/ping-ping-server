import { z } from "zod"

import {
    connectDiscordSchema,
    discordCallbackSchema,
    getGuildChannelsSchema,
} from "../schemas/discord-oauth.schema"

export type DiscordCallbackQuery = z.infer<typeof discordCallbackSchema>

export type GetGuildChannelsParams = z.infer<typeof getGuildChannelsSchema>

export type ConnectDiscordDto = z.infer<typeof connectDiscordSchema>

export interface DiscordTokenDto {
    access_token: string
    token_type: "Bearer"
    expires_in: number
    refresh_token: string
    scope: string
}

export interface DiscordUserDto {
    id: string
    username: string
    global_name: string | null
    discriminator: string
    avatar: string | null
}

export interface DiscordGuildDto {
    id: string
    name: string
    icon: string | null
    owner: boolean
    permissions: string
    features: string[]
}

export interface DiscordChannelDto {
    id: string
    guild_id: string
    name: string
    type: number
    position: number
}
