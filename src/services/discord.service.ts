import {
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    TextChannel,
} from "discord.js"

import { discordClient } from "../config/discord.config"
import { env } from "../config/env.config"
import {
    DiscordChannelResponse,
    DiscordGuildResponse,
    DiscordTokenResponse,
    DiscordUserResponse,
} from "../dto/discord.response"
import {
    DISCORD_API_URL,
    DISCORD_BOT_PERMISSIONS,
    DISCORD_OAUTH_SCOPES,
} from "../constants/discord.constants"

interface SendDiscordMessageOptions {
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

export class DiscordService {
    async send({
        channelId,
        message,
        filePaths,
        embed,
        buttons,
    }: SendDiscordMessageOptions) {
        const channel = await discordClient.channels.fetch(channelId)

        if (!channel) {
            throw new Error("Channel not found.")
        }

        if (!channel.isTextBased()) {
            throw new Error("Channel is not text-based.")
        }

        const files = filePaths?.map(
            (filePath) => new AttachmentBuilder(filePath),
        )

        const embeds = embed
            ? [
                  new EmbedBuilder()
                      .setTitle(embed.title ?? null)
                      .setDescription(embed.description ?? null)
                      .setColor(embed.color ?? 0x5865f2),
              ]
            : []

        let components: ActionRowBuilder<ButtonBuilder>[] = []

        if (buttons === "confirmation") {
            components = [
                new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                        .setCustomId("confirm")
                        .setLabel("Confirm")
                        .setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
                        .setCustomId("skip")
                        .setLabel("Skip")
                        .setStyle(ButtonStyle.Secondary),
                ),
            ]
        }

        await (channel as TextChannel).send({
            content: message,
            files,
            embeds,
            components,
        })
    }

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

    async exchangeAuthorizationCode(
        code: string,
    ): Promise<DiscordTokenResponse> {
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

        return (await response.json()) as DiscordTokenResponse
    }

    async getCurrentUser(accessToken: string): Promise<DiscordUserResponse> {
        const response = await fetch(`${DISCORD_API_URL}/users/@me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch current user.")
        }

        return (await response.json()) as DiscordUserResponse
    }

    async getUserGuilds(accessToken: string): Promise<DiscordGuildResponse[]> {
        const response = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch guilds.")
        }

        return (await response.json()) as DiscordGuildResponse[]
    }

    async getGuildChannels(
        accessToken: string,
        guildId: string,
    ): Promise<DiscordChannelResponse[]> {
        const response = await fetch(
            `${DISCORD_API_URL}/guilds/${guildId}/channels`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        )

        if (!response.ok) {
            throw new Error("Failed to fetch channels.")
        }

        return (await response.json()) as DiscordChannelResponse[]
    }

    async revokeConnection(accessToken: string) {
        // todo
    }
}

export const discordService = new DiscordService()
