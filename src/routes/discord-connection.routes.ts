import { Router } from "express"

import { discordConnectionController } from "../controllers/discord-connection.controller"
import { validate } from "../middleware/validate.middleware"
import {
    connectDiscordSchema,
    updateDiscordChannelSchema,
} from "../schemas/discord-connection.schema"
import { requireAuth } from "../middleware/require-auth.middleware"

const router = Router()

router.post(
    "/",
    requireAuth,
    validate(connectDiscordSchema),
    discordConnectionController.createConnection,
)

router.get("/", requireAuth, discordConnectionController.getConnection)

router.patch(
    "/channel",
    requireAuth,
    validate(updateDiscordChannelSchema),
    discordConnectionController.updateChannel,
)

router.delete("/", requireAuth, discordConnectionController.disconnect)

export default router
