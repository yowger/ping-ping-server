import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { discordConnections } from "./discord-connection.schema"

export const reminders = pgTable("reminders", {
    id: uuid().defaultRandom().primaryKey(),
    discordConnectionId: uuid()
        .references(() => discordConnections.id, {
            onDelete: "cascade",
        })
        .notNull(),

    jobId: text(),
    title: text().notNull(),
    message: text().notNull(),
    scheduledAt: timestamp().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
})
