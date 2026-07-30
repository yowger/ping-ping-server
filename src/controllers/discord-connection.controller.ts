import { Request, Response } from "express"

import { discordConnectionService } from "../services/discord-connection.service"

import type {
    ConnectDiscordResponseDto,
    DiscordConnectionResponseDto,
    UpdateDiscordChannelDto,
} from "../dto/discord-connection.dto"

export class DiscordConnectionController {
    async createConnection(
        req: Request,
        res: Response<ConnectDiscordResponseDto>,
    ) {
        const connection = await discordConnectionService.createConnection(
            req.user.id,
            req.body,
        )

        return res.status(201).json(connection)
    }

    async getConnection(
        req: Request,
        res: Response<DiscordConnectionResponseDto>,
    ) {
        const connection = await discordConnectionService.getByUserId(
            req.user.id,
        )

        return res.status(200).json(connection)
    }

    async updateChannel(
        req: Request<{}, {}, UpdateDiscordChannelDto>,
        res: Response<DiscordConnectionResponseDto>,
    ) {
        const connection = await discordConnectionService.updateChannel(
            req.user.id,
            req.body.channelId,
        )

        return res.status(200).json(connection)
    }

    async disconnect(req: Request, res: Response) {
        await discordConnectionService.disconnect(req.user.id)

        return res.sendStatus(204)
    }
}

export const discordConnectionController = new DiscordConnectionController()
