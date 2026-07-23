import { Request, Response } from "express"

import { discordOAuthService } from "../services/discord-oauth.service"
import { getAccessToken } from "../utils/http.utils"

import type {
    DiscordCallbackQuery,
    DiscordCallbackResponseDto,
    DiscordChannelsResponseDto,
    DiscordCurrentUserResponseDto,
    DiscordGuildsResponseDto,
    DiscordInviteUrlResponseDto,
    GetGuildChannelsParams,
} from "../dto/discord.dto"

export class DiscordOAuthController {
    getInviteUrl(req: Request, res: Response<DiscordInviteUrlResponseDto>) {
        const url = discordOAuthService.generateInviteUrl()

        return res.json({ url })
    }

    async callback(
        req: Request<{}, {}, {}, DiscordCallbackQuery>,
        res: Response<DiscordCallbackResponseDto>,
    ) {
        const { code } = req.query

        const token = await discordOAuthService.exchangeAuthorizationCode(code)

        return res.json(token)
    }

    async getCurrentUser(
        req: Request,
        res: Response<DiscordCurrentUserResponseDto>,
    ) {
        const accessToken = getAccessToken(req)

        const user = await discordOAuthService.getCurrentUser(accessToken)

        return res.json(user)
    }

    async getGuilds(req: Request, res: Response<DiscordGuildsResponseDto>) {
        const accessToken = getAccessToken(req)

        const guilds = await discordOAuthService.getUserGuilds(accessToken)

        return res.json(guilds)
    }

    async getChannels(
        req: Request<GetGuildChannelsParams>,
        res: Response<DiscordChannelsResponseDto>,
    ) {
        const channels = await discordOAuthService.getGuildChannels(
            req.params.guildId,
        )

        return res.json(channels)
    }
}

export const discordOAuthController = new DiscordOAuthController()
