import {
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    OAuth2Scopes,
    PermissionFlagsBits,
    TextChannel,
} from "discord.js"

import { discordClient } from "../config/discord.config"
import { env } from "../config/env.config"

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
        const permissions =
            PermissionFlagsBits.ViewChannel |
            PermissionFlagsBits.SendMessages |
            PermissionFlagsBits.AttachFiles |
            PermissionFlagsBits.EmbedLinks

        const params = new URLSearchParams({
            client_id: env.DISCORD_APP_ID!,
            scope: [
                OAuth2Scopes.Bot,
                OAuth2Scopes.Identify,
                OAuth2Scopes.Guilds,
            ].join(" "),
            permissions: permissions.toString(),
            // redirect_uri: env.DISCORD_REDIRECT_URI!,
            // response_type: "code",
        })

        return `https://discord.com/oauth2/authorize?${params.toString()}`
    }
}

export const discordService = new DiscordService()
