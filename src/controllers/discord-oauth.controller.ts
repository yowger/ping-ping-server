import { Request, Response } from "express"

import { discordOAuthService } from "../services/discord-oauth.service"
import { getAccessToken } from "../utils/http.utils"

import type {
    DiscordChannelsResponseDto,
    DiscordCurrentUserResponseDto,
    DiscordGuildsResponseDto,
    DiscordInviteUrlResponseDto,
    GetGuildChannelsParams,
} from "../dto/discord.dto"
import { discordConnectionService } from "../services/discord-connection.service"
import { NotFoundError } from "../errors/not-found.error"

export class DiscordOAuthController {
    getInviteUrl(req: Request, res: Response<DiscordInviteUrlResponseDto>) {
        const url = discordOAuthService.generateInviteUrl()

        return res.json({ url })
    }

    async getCurrentUser(
        req: Request,
        res: Response<DiscordCurrentUserResponseDto>,
    ) {
        const connection = await discordConnectionService.getByUserId(
            req.user.id,
        )

        const user = await discordOAuthService.getCurrentUser(
            connection.accessToken,
        )

        return res.json(user)
    }

    async getGuilds(req: Request, res: Response<DiscordGuildsResponseDto>) {
        const connection = await discordConnectionService.getByUserId(
            req.user.id,
        )

        const guilds = await discordOAuthService.getUserGuilds(
            connection.accessToken,
        )

        return res.json(guilds)
    }

    async getChannels(req: Request, res: Response<DiscordChannelsResponseDto>) {
        const connection = await discordConnectionService.getByUserId(
            req.user.id,
        )

        const channels = await discordOAuthService.getGuildChannels(
            connection.guildId,
        )

        return res.json(channels)
    }
}

export const discordOAuthController = new DiscordOAuthController()
