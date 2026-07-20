import { Request, Response } from "express"

import { discordService } from "../services/discord.service"
import { SendDiscordMessageDto } from "../dto/discord.dto"

export class DiscordController {
    async send(req: Request<{}, {}, SendDiscordMessageDto>, res: Response) {
        await discordService.send(req.body)

        return res.status(200).json({
            message: "Message sent successfully.",
        })
    }
}

export const discordController = new DiscordController()
