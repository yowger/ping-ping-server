import { ChannelType } from "discord.js"

import { discordClient } from "../config/discord.config"
import { env } from "../config/env.config"
import {
    DiscordGuildDto,
    DiscordTokenDto,
    DiscordUserDto,
} from "../dto/discord.dto"
import {
    DISCORD_API_URL,
    DISCORD_BOT_PERMISSIONS,
    DISCORD_OAUTH_SCOPES,
} from "../constants/discord-oauth.constants"

export class DiscordOAuthService {
    generateInviteUrl() {
        const params = new URLSearchParams({
            client_id: env.DISCORD_APP_ID!,
            scope: DISCORD_OAUTH_SCOPES,
            permissions: DISCORD_BOT_PERMISSIONS.toString(),
            redirect_uri: env.DISCORD_REDIRECT_URI!,
            response_type: "code",
        })

        return `${DISCORD_API_URL}/oauth2/authorize?${params.toString()}`
    }

    async exchangeAuthorizationCode(code: string): Promise<DiscordTokenDto> {
        const body = new URLSearchParams({
            client_id: env.DISCORD_APP_ID!,
            client_secret: env.DISCORD_CLIENT_SECRET!,
            grant_type: "authorization_code",
            code,
            redirect_uri: env.DISCORD_REDIRECT_URI!,
        })

        const response = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        })

        if (!response.ok) {
            throw new Error("Failed to exchange authorization code.")
        }

        return (await response.json()) as DiscordTokenDto
    }

    async getCurrentUser(accessToken: string): Promise<DiscordUserDto> {
        const response = await fetch(`${DISCORD_API_URL}/users/@me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch current user.")
        }

        return (await response.json()) as DiscordUserDto
    }

    async getUserGuilds(accessToken: string): Promise<DiscordGuildDto[]> {
        const response = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch guilds.")
        }

        return (await response.json()) as DiscordGuildDto[]
    }

    async getGuildChannels(guildId: string) {
        const guild = await discordClient.guilds.fetch(guildId)

        const channels = await guild.channels.fetch()

        return channels
            .filter(
                (channel) =>
                    channel &&
                    channel.isTextBased() &&
                    channel.type === ChannelType.GuildText,
            )
            .map((channel) => ({
                id: channel!.id,
                name: channel!.name,
            }))
    }

    async refreshAccessToken(refreshToken: string): Promise<DiscordTokenDto> {
        const body = new URLSearchParams({
            client_id: env.DISCORD_APP_ID!,
            client_secret: env.DISCORD_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        })

        const response = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        })

        if (!response.ok) {
            throw new Error("Failed to refresh Discord access token.")
        }

        return (await response.json()) as DiscordTokenDto
    }

    async revokeConnection(accessToken: string) {
        // todo
    }
}

export const discordService = new DiscordOAuthService()

// todo save: accessToken, refreshToken, expiresAt, discordUserId for each individual user in the database
// todo: add database and refactor whole
