import { Queue } from "bullmq"
import { redisConnection } from "../config/redis.config"

export const reminderQueue = new Queue("reminders", {
    connection: redisConnection as any,
})

