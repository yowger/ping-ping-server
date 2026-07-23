import { z } from "zod"

export const createReminderQueueSchema = z.object({
    title: z.string().min(1),
    reminderId: z.string().min(1),
    message: z.string(),
    scheduledAt: z.string(),
    channel: z.enum(["discord"]),
})

export const deleteReminderQueueSchema = z.object({
    id: z.string().min(1),
})

export const getReminderQueueSchema = z.object({
    id: z.string().min(1),
})

export const updateReminderQueueSchema = createReminderQueueSchema
