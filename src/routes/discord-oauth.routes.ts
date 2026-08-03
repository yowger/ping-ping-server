import { Router } from "express"

import { discordOAuthController } from "../controllers/discord-oauth.controller"
import { requireAuth } from "../middleware/require-auth.middleware"

const router = Router()

router.get("/invite", requireAuth, discordOAuthController.getInviteUrl)

router.get("/me", requireAuth, discordOAuthController.getCurrentUser)

router.get("/guilds", requireAuth, discordOAuthController.getGuilds)

router.get(
    "/guilds/channels",
    requireAuth,
    discordOAuthController.getChannels,
)

export default router
