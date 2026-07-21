import { MessageFlags } from "discord.js"

import { discordClient } from "../config/discord.config"

export function registerDiscordInteractions() {
    discordClient.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return

        const username =
            interaction.user.displayName ?? interaction.user.username

        switch (interaction.customId) {
            case "confirm":
                await interaction.update({
                    content: `${interaction.message.content}\n${username} confirmed.`,
                    embeds: interaction.message.embeds,
                    components: interaction.message.components,
                })
                return

            case "skip":
                await interaction.update({
                    content: `${interaction.message.content}\n${username} skipped.`,
                    embeds: interaction.message.embeds,
                    components: interaction.message.components,
                })
                return
        }

        await interaction.reply({
            content: "Unknown action.",
            flags: MessageFlags.Ephemeral,
        })
    })
}

// TODO save interactions to db. refactor whole
/*
id
reminderId
discordUserId
discordUsername
status         // "confirmed" | "skipped"
respondedAt
*/
