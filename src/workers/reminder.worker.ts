import { Worker } from "bullmq"

import { redisConnection } from "../config/redis.config"

export const reminderWorker = new Worker(
    "send-reminder",
    async (job) => {
        console.log(`Sending reminder for job ${job.id} with data:`, job.data)
    },
    {
        connection: redisConnection as any,
    },
)

reminderWorker.on("completed", (job) => {
    console.log(`Job ${job.id} has completed!`)
})

reminderWorker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} has failed with ${err.message}`)
})

const gracefulShutdown = async (signal: string) => {
    console.log(`Received ${signal}, closing worker safely.`)

    await reminderWorker.close()

    console.log("Worker closed. Exiting process.")
    process.exit(0)
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"))
process.on("SIGINT", () => gracefulShutdown("SIGINT"))
