import { Request, Response } from "express"

import { discordDeliveryService } from "../services/discord-delivery.service"

import type {
    DiscordMessageResponseDto,
    SendDiscordMessageDto,
} from "../dto/discord.dto"

export class DiscordController {
    async send(
        req: Request<{}, {}, SendDiscordMessageDto>,
        res: Response<DiscordMessageResponseDto>,
    ) {
        await discordDeliveryService.send(req.body)

        return res.status(200).json({
            message: "Message sent successfully.",
        })
    }
}

export const discordController = new DiscordController()
