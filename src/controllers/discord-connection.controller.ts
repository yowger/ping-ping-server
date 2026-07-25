import { Request, Response } from "express"

import { discordConnectionService } from "../services/discord-connection.service"

import type {
    ConnectDiscordDto,
    ConnectDiscordResponseDto,
    DeleteDiscordConnectionParams,
    DiscordConnectionResponseDto,
    GetDiscordConnectionParams,
    GetDiscordConnectionByGuildParams,
    UpdateDiscordChannelDto,
} from "../dto/discord-connection.dto"

export class DiscordConnectionController {
    async connect(
        req: Request<{}, {}, ConnectDiscordDto>,
        res: Response<ConnectDiscordResponseDto>,
    ) {
        const connection = await discordConnectionService.connect(req.body)

        return res.status(201).json(connection)
    }

    async getById(
        req: Request<GetDiscordConnectionParams>,
        res: Response<DiscordConnectionResponseDto>,
    ) {
        const connection = await discordConnectionService.getById(req.params.id)

        return res.status(200).json(connection)
    }

    async getByGuildId(
        req: Request<GetDiscordConnectionByGuildParams>,
        res: Response<DiscordConnectionResponseDto>,
    ) {
        const connection = await discordConnectionService.getByGuildId(
            req.params.guildId,
        )

        return res.status(200).json(connection)
    }

    async updateChannel(
        req: Request<GetDiscordConnectionParams, {}, UpdateDiscordChannelDto>,
        res: Response<DiscordConnectionResponseDto>,
    ) {
        const connection = await discordConnectionService.updateChannel(
            req.params.id,
            req.body.channelId,
        )

        return res.status(200).json(connection)
    }

    async disconnect(
        req: Request<DeleteDiscordConnectionParams>,
        res: Response,
    ) {
        await discordConnectionService.disconnect(req.params.id)

        return res.sendStatus(204)
    }
}

export const discordConnectionController = new DiscordConnectionController()
