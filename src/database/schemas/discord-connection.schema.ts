import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { user } from "./auth-schema.schema"

export const discordConnections = pgTable("discord_connections", {
    id: uuid().defaultRandom().primaryKey(),
    userId: text()
        .references(() => user.id, {
            onDelete: "cascade",
        })
        .notNull(),
    discordUserId: text().notNull(),
    guildId: text().notNull(),
    channelId: text(),
    accessToken: text().notNull(),
    refreshToken: text().notNull(),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
})
