import { ConflictError } from "../errors/conflict.error"
import { discordOAuthService } from "./discord-oauth.service"

import { discordConnectionRepository } from "../repositories/discord-connection.repository"
import { NotFoundError } from "../errors/not-found.error"
import { BadRequestError } from "../errors/bad-request.error"

import type {
    DiscordConnection,
    CreateDiscordConnectionInput,
} from "../types/discord-connection.types"

class DiscordConnectionService {
    async createConnection(
        userId: string,
        data: CreateDiscordConnectionInput,
    ): Promise<DiscordConnection> {
        const existing = await discordConnectionRepository.getByUserId(userId)

        if (existing) {
            throw new ConflictError("Discord account already connected.")
        }

        const token = await discordOAuthService.exchangeAuthorizationCode(
            data.code,
        )

        const user = await discordOAuthService.getCurrentUser(
            token.access_token,
        )

        const connection = await discordConnectionRepository.create({
            userId,
            discordUserId: user.id,
            guildId: data.guildId,
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            expiresAt: new Date(Date.now() + token.expires_in * 1000),
        })

        return connection
    }

    async getByUserId(userId: string): Promise<DiscordConnection> {
        const connection = await discordConnectionRepository.getByUserId(userId)

        if (!connection) {
            throw new NotFoundError("Discord connection not found.")
        }

        return connection
    }

    async getActiveConnection(userId: string): Promise<DiscordConnection> {
        const connection = await this.getByUserId(userId)

        if (!connection.channelId) {
            throw new BadRequestError("Please select a Discord channel first.")
        }

        return connection
    }

    // async updateByUserId(
    //     userId: string,
    //     data: UpdateDiscordConnectionInput,
    // ): Promise<DiscordConnection | undefined> {
    //     const [connection] = await db
    //         .update(discordConnections)
    //         .set({
    //             ...data,
    //             updatedAt: new Date(),
    //         })
    //         .where(eq(discordConnections.userId, userId))
    //         .returning()

    //     return connection
    // }

    // async deleteByUserId(
    //     userId: string,
    // ): Promise<DiscordConnection | undefined> {
    //     const [connection] = await db
    //         .delete(discordConnections)
    //         .where(eq(discordConnections.userId, userId))
    //         .returning()

    //     return connection
    // }

    async getByGuildId(guildId: string): Promise<DiscordConnection> {
        const connection =
            await discordConnectionRepository.getByGuildId(guildId)

        if (!connection) {
            throw new NotFoundError("Discord connection not found.")
        }

        return connection
    }

    async updateChannel(
        userId: string,
        channelId: string,
    ): Promise<DiscordConnection> {
        const connection = await this.getByUserId(userId)

        return (await discordConnectionRepository.update(connection.id, {
            channelId,
        }))!
    }

    // async refreshToken(id: string): Promise<DiscordConnection> {
    //     const connection = await this.getByUserId(id)

    //     const token = await discordOAuthService.refreshAccessToken(
    //         connection.refreshToken,
    //     )

    //     return (await discordConnectionRepository.update(connection.id, {
    //         accessToken: token.access_token,
    //         refreshToken: token.refresh_token,
    //         expiresAt: new Date(Date.now() + token.expires_in * 1000),
    //     }))!
    // }

    async disconnect(userId: string): Promise<void> {
        const connection = await this.getByUserId(userId)

        await discordConnectionRepository.delete(connection.id)
    }
}

export const discordConnectionService = new DiscordConnectionService()
