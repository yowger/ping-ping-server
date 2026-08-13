import { SEND_REMINDER_JOB } from "../constants/queue.constants"

import { reminderRepository } from "../repositories/reminder.repository"
import { discordConnectionRepository } from "../repositories/discord-connection.repository"
import { discordDeliveryService } from "../services/discord-delivery.service"

import { JobHandler } from "../types/job-handler.types"

export const jobHandlers: Record<string, JobHandler> = {
    [SEND_REMINDER_JOB]: async (job) => {
        const reminder = await reminderRepository.getById(job.data.reminderId)

        if (!reminder) {
            return
        }

        const connection = await discordConnectionRepository.getById(
            reminder.discordConnectionId,
        )

        if (!connection?.channelId) {
            return
        }

        await discordDeliveryService.send({
            channelId: connection.channelId,
            embed: {
                title: reminder.title,
                description: reminder.message,
            },
            buttons: "confirmation",
        })
    },
}
