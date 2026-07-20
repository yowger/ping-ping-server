import { Request, Response } from "express"

import { discordService } from "../services/discord-oauth.service"
import { getAccessToken } from "../utils/http.utils"

export class DiscordOAuthController {
    getInviteUrl(req: Request, res: Response) {
        const url = discordService.generateInviteUrl()

        return res.json({ url })
    }

    async callback(req: Request, res: Response) {
        const code = req.query.code as string

        if (!code) {
            return res.status(400).json({
                message: "Authorization code is required.",
            })
        }

        const token = await discordService.exchangeAuthorizationCode(code)

        return res.json(token)
    }

    async getCurrentUser(
        req: Request<{}, {}, { accessToken: string }>,
        res: Response,
    ) {
        const accessToken = getAccessToken(req)

        const user = await discordService.getCurrentUser(accessToken)

        return res.json(user)
    }

    async getGuilds(
        req: Request<{}, {}, { accessToken: string }>,
        res: Response,
    ) {
        const accessToken = getAccessToken(req)

        const guilds = await discordService.getUserGuilds(accessToken)

        return res.json(guilds)
    }

    async getChannels(req: Request<{ guildId: string }>, res: Response) {
        const { guildId } = req.params

        const channels = await discordService.getGuildChannels(guildId)

        return res.json(channels)
    }
}

export const discordController = new DiscordOAuthController()

