import { ConflictError } from "../errors/conflict.error"
import { discordOAuthService } from "./discord-oauth.service"

import { discordConnectionRepository } from "../repositories/discord-connection.repository"
import { NotFoundError } from "../errors/not-found.error"

import type {
    DiscordConnection,
    ConnectDiscordInput,
} from "../types/discord-connection.types"

class DiscordConnectionService {
    async connect(data: ConnectDiscordInput): Promise<DiscordConnection> {
        const token = await discordOAuthService.exchangeAuthorizationCode(
            data.code,
        )

        const user = await discordOAuthService.getCurrentUser(
            token.access_token,
        )

        const existing = await discordConnectionRepository.getByGuildId(
            data.guildId,
        )

        if (existing) {
            throw new ConflictError("This Discord server is already connected.")
        }

        const connection = await discordConnectionRepository.create({
            discordUserId: user.id,
            guildId: data.guildId,
            channelId: data.channelId,
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            expiresAt: new Date(Date.now() + token.expires_in * 1000),
        })

        return connection
    }

    async getById(id: string): Promise<DiscordConnection> {
        const connection = await discordConnectionRepository.getById(id)

        if (!connection) {
            throw new NotFoundError("Discord connection not found.")
        }

        return connection
    }

    async getByGuildId(guildId: string): Promise<DiscordConnection> {
        const connection =
            await discordConnectionRepository.getByGuildId(guildId)

        if (!connection) {
            throw new NotFoundError("Discord connection not found.")
        }

        return connection
    }

    async updateChannel(
        id: string,
        channelId: string,
    ): Promise<DiscordConnection> {
        const connection = await this.getById(id)

        return (await discordConnectionRepository.update(connection.id, {
            channelId,
        }))!
    }

    async refreshToken(id: string): Promise<DiscordConnection> {
        const connection = await this.getById(id)

        const token = await discordOAuthService.refreshAccessToken(
            connection.refreshToken,
        )

        return (await discordConnectionRepository.update(connection.id, {
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            expiresAt: new Date(Date.now() + token.expires_in * 1000),
        }))!
    }

    async disconnect(id: string): Promise<void> {
        const connection = await this.getById(id)

        await discordConnectionRepository.delete(connection.id)
    }
}

export const discordConnectionService = new DiscordConnectionService()
