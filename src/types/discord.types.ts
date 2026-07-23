import { Message } from "discord.js"

export interface SendDiscordMessageInput {
    channelId: string
    message?: string
    filePaths?: string[]
    embed?: {
        title?: string
        description?: string
        color?: number
    }
    buttons?: "confirmation"
}

export type DiscordMessage = Message<true>

export interface DiscordToken {
    access_token: string
    token_type: "Bearer"
    expires_in: number
    refresh_token: string
    scope: string
}

export interface DiscordUser {
    id: string
    username: string
    global_name: string | null
    discriminator: string
    avatar: string | null
}

export interface DiscordGuild {
    id: string
    name: string
    icon: string | null
    owner: boolean
    permissions: string
    features: string[]
}

export interface DiscordChannel {
    id: string
    guild_id: string
    name: string
    type: number
    position: number
}

export interface GuildChannel {
    id: string
    name: string
}
