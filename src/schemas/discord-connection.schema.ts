import { z } from "zod"

export const connectDiscordSchema = z.object({
    code: z.string().min(1),
    guildId: z.string().min(1),
    channelId: z.string().min(1),
})

export const getDiscordConnectionSchema = z.object({
    id: z.string().uuid(),
})

export const getDiscordConnectionByGuildSchema = z.object({
    guildId: z.string().min(1),
})

export const deleteDiscordConnectionSchema = getDiscordConnectionSchema

export const updateDiscordChannelSchema = z.object({
    channelId: z.string().min(1),
})
