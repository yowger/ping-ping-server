import { Router } from "express"

import { discordOAuthController } from "../controllers/discord-oauth.controller"
import { discordController } from "../controllers/discord.controller"

const router = Router()

router.get("/invite", discordOAuthController.getInviteUrl)

router.get("/callback", discordOAuthController.callback)

router.get("/me", discordOAuthController.getCurrentUser)

router.get("/guilds", discordOAuthController.getGuilds)

router.get("/guilds/:guildId/channels", discordOAuthController.getChannels)

router.post("/send", discordController.send)

export default router
