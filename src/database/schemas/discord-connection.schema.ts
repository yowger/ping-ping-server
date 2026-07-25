import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const discordConnections = pgTable("discord_connections", {
    id: uuid().defaultRandom().primaryKey(),
    // userId: uuid()
    //     .references(() => users.id)
    //     .notNull(),
    discordUserId: text().notNull(),
    guildId: text().notNull(),
    channelId: text().notNull(),
    accessToken: text().notNull(),
    refreshToken: text().notNull(),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
})
