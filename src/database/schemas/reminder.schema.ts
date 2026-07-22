import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const reminders = pgTable("reminders", {
    id: uuid().defaultRandom().primaryKey(),
    title: text().notNull(),
    message: text().notNull(),
    scheduledAt: timestamp().notNull(),
    channel: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
})
