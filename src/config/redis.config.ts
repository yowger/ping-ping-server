import Redis from "ioredis"

import { env } from "./env.config"

export const connection = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
})

connection.on("connect", () => {
    console.log("Redis connected")
})

connection.on("error", (err) => {
    console.error("Redis error:", err)
})
