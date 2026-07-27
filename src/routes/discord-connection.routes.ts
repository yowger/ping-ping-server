import { Router } from "express"

import { discordConnectionController } from "../controllers/discord-connection.controller"
import { validate } from "../middleware/validate.middleware"

import {
    connectDiscordSchema,
    deleteDiscordConnectionSchema,
    getDiscordConnectionByGuildSchema,
    getDiscordConnectionSchema,
    updateDiscordChannelSchema,
} from "../schemas/discord-connection.schema"

const router = Router()

router.post(
    "/",
    validate(connectDiscordSchema),
    discordConnectionController.createConnection,
)

router.get(
    "/:id",
    validate(getDiscordConnectionSchema, "params"),
    discordConnectionController.getById,
)

router.get(
    "/guild/:guildId",
    validate(getDiscordConnectionByGuildSchema, "params"),
    discordConnectionController.getByGuildId,
)

router.patch(
    "/:id/channel",
    validate(getDiscordConnectionSchema, "params"),
    validate(updateDiscordChannelSchema),
    discordConnectionController.updateChannel,
)

router.delete(
    "/:id",
    validate(deleteDiscordConnectionSchema, "params"),
    discordConnectionController.disconnect,
)

export default router
