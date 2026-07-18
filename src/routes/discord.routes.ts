import { Router } from "express"

import { discordController } from "../controllers/discord.controller"

const router = Router()

router.get("/invite", discordController.getInviteUrl)

router.get("/callback", discordController.callback)

router.get("/me", discordController.getCurrentUser)

router.get("/guilds", discordController.getGuilds)

router.get("/guilds/:guildId/channels", discordController.getChannels)

export default router
