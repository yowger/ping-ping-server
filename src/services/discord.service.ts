import {
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    TextChannel,
} from "discord.js"

import { discordClient } from "../config/discord.config"

import type {
    DiscordMessage,
    SendDiscordMessageInput,
} from "../types/discord.types"

export class DiscordService {
    async send({
        channelId,
        message,
        filePaths,
        embed,
        buttons,
    }: SendDiscordMessageInput): Promise<DiscordMessage> {
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

        return (channel as TextChannel).send({
            content: message,
            files,
            embeds,
            components,
        })
    }
}

export const discordService = new DiscordService()

// todo save: accessToken, refreshToken, expiresAt, discordUserId for each individual user in the database
// todo: add database and refactor whole
