import { ChannelType } from "discord.js"

import { discordClient } from "../config/discord.config"
import { env } from "../config/env.config"
import {
    DISCORD_API_URL,
    DISCORD_BOT_PERMISSIONS,
    DISCORD_OAUTH_SCOPES,
} from "../constants/discord-oauth.constants"
import { ExternalServiceError } from "../errors/external-service.error"
import { NotFoundError } from "../errors/not-found.error"
import { UnauthorizedError } from "../errors/unauthorized.error"

import type {
    DiscordGuild,
    DiscordToken,
    DiscordUser,
    GuildChannel,
} from "../types/discord.types"

export class DiscordOAuthService {
    generateInviteUrl(): string {
        const params = new URLSearchParams({
            client_id: env.DISCORD_APP_ID!,
            scope: DISCORD_OAUTH_SCOPES,
            permissions: DISCORD_BOT_PERMISSIONS.toString(),
            redirect_uri: env.DISCORD_REDIRECT_URI!,
            response_type: "code",
        })

        return `${DISCORD_API_URL}/oauth2/authorize?${params.toString()}`
    }

    async exchangeAuthorizationCode(code: string): Promise<DiscordToken> {
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

        if (response.status === 400) {
            throw new UnauthorizedError(
                "Invalid or expired authorization code.",
            )
        }

        if (!response.ok) {
            const error = await response.json().catch(() => null)

            throw new ExternalServiceError(
                error?.message ??
                    "Failed to exchange Discord authorization code.",
            )
        }

        return await response.json()
    }

    async getCurrentUser(accessToken: string): Promise<DiscordUser> {
        const response = await fetch(`${DISCORD_API_URL}/users/@me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (response.status === 401) {
            throw new UnauthorizedError(
                "Invalid or expired Discord access token.",
            )
        }

        if (!response.ok) {
            const error = await response.json().catch(() => null)

            throw new ExternalServiceError(
                error?.message ?? "Failed to fetch Discord user.",
            )
        }

        return await response.json()
    }

    async getUserGuilds(accessToken: string): Promise<DiscordGuild[]> {
        const response = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (response.status === 401) {
            throw new UnauthorizedError(
                "Invalid or expired Discord access token.",
            )
        }

        if (!response.ok) {
            const error = await response.json().catch(() => null)

            throw new ExternalServiceError(
                error?.message ?? "Failed to fetch Discord guilds.",
            )
        }

        return await response.json()
    }

    async getGuildChannels(guildId: string): Promise<GuildChannel[]> {
        try {
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
        } catch {
            throw new NotFoundError("Discord guild not found.")
        }
    }

    async refreshAccessToken(refreshToken: string): Promise<DiscordToken> {
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

        if (response.status === 400 || response.status === 401) {
            throw new UnauthorizedError("Invalid refresh token.")
        }

        if (!response.ok) {
            const error = await response.json().catch(() => null)

            throw new ExternalServiceError(
                error?.message ?? "Failed to refresh Discord access token.",
            )
        }

        return await response.json()
    }

    async revokeConnection(accessToken: string): Promise<void> {
        // todo
    }
}

export const discordOAuthService = new DiscordOAuthService()

// todo save: accessToken, refreshToken, expiresAt, discordUserId for each individual user in the database
// todo: add database and refactor whole
// reduce redundant
