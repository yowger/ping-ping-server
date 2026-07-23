import { Router } from "express"

import { discordOAuthController } from "../controllers/discord-oauth.controller"
import { discordController } from "../controllers/discord.controller"
import { validate } from "../middleware/validate.middleware"
import {
    authorizationHeaderSchema,
    discordCallbackSchema,
    getGuildChannelsSchema,
    sendDiscordMessageSchema,
} from "../schemas/discord.schema"

const router = Router()

router.get("/invite", discordOAuthController.getInviteUrl)

router.get(
    "/callback",
    validate(discordCallbackSchema, "query"),
    discordOAuthController.callback,
)

router.get(
    "/me",
    validate(authorizationHeaderSchema, "headers"),
    discordOAuthController.getCurrentUser,
)

router.get(
    "/guilds",
    validate(authorizationHeaderSchema, "headers"),
    discordOAuthController.getGuilds,
)

router.get(
    "/guilds/:guildId/channels",
    validate(getGuildChannelsSchema, "params"),
    discordOAuthController.getChannels,
)

router.post("/send", validate(sendDiscordMessageSchema), discordController.send)

export default router
