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

export const sendDiscordMessageSchema = z.object({
    channelId: z.string().min(1),
    message: z.string().optional(),
    filePaths: z.array(z.string()).optional(),
    embed: z
        .object({
            title: z.string().optional(),
            description: z.string().optional(),
            color: z.number().optional(),
        })
        .optional(),
    buttons: z.enum(["confirmation"]).optional(),
})
