import Redis from "ioredis"

import { env } from "./env.config"

export const redisConnection = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
})

redisConnection.on("connect", () => {
    console.log("Redis connected")
})

redisConnection.on("error", (err) => {
    console.error("Redis error:", err)
})
