import { z } from "zod"

export const createReminderSchema = z.object({
    title: z.string().min(1),
    message: z.string(),
    scheduledAt: z.string(),
})

export const updateReminderSchema = z
    .object({
        title: z.string().min(1).optional(),
        message: z.string().optional(),
        scheduledAt: z.string().optional(),
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        "At least one field must be provided.",
    )

export const reminderIdParamsSchema = z.object({
    id: z.string().min(1),
})
