import { Queue } from "bullmq"

import { redisConnection } from "../config/redis.config"
import { REMINDER_QUEUE } from "../constants/queue.constants"

export const reminderQueue = new Queue(REMINDER_QUEUE, {
    connection: redisConnection as any,
})
