import { Client, GatewayIntentBits } from "discord.js"

import { env } from "./env.config"

export const discordClient = new Client({
    intents: [GatewayIntentBits.Guilds],
})

discordClient.once("ready", () => {
    console.log(`Discord bot logged in as ${discordClient.user?.tag}`)
})

discordClient.on("error", (err) => {
    console.error("Discord error:", err)
})

export async function connectDiscord() {
    await discordClient.login(env.DISCORD_BOT_TOKEN)
}
