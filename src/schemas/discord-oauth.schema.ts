import { z } from "zod"

export const discordCallbackSchema = z.object({
    code: z.string().min(1),
})

export const getGuildChannelsSchema = z.object({
    guildId: z.string().min(1),
})

export const connectDiscordSchema = z.object({
    guildId: z.string().min(1),
    channelId: z.string().min(1),
})
