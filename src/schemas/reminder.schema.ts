import { z } from "zod"

export const createReminderSchema = z.object({
    title: z.string().min(1),
    message: z.string(),
    scheduledAt: z.string(),
    channel: z.enum(["discord"]),
})

export const deleteReminderSchema = z.object({
    id: z.string().min(1),
})

export const getReminderSchema = z.object({
    id: z.string().min(1),
})

export const updateReminderSchema = createReminderSchema
