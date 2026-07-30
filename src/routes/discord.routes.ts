import { Router } from "express"

import { discordOAuthController } from "../controllers/discord-oauth.controller"
import { discordController } from "../controllers/discord.controller"
import { validate } from "../middleware/validate.middleware"
import { sendDiscordMessageSchema } from "../schemas/discord.schema"
import { requireAuth } from "../middleware/require-auth.middleware"

const router = Router()

router.get("/invite", requireAuth, discordOAuthController.getInviteUrl)

router.get("/me", requireAuth, discordOAuthController.getCurrentUser)

router.get("/guilds", requireAuth, discordOAuthController.getGuilds)

router.get(
    "/guilds/:guildId/channels",
    requireAuth,
    discordOAuthController.getChannels,
)

router.post(
    "/send",
    requireAuth,
    validate(sendDiscordMessageSchema),
    discordController.send,
)

export default router
