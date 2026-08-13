import { Worker } from "bullmq"

import { redisConnection } from "../config/redis.config"
import { REMINDER_QUEUE } from "../constants/queue.constants"
import { jobHandlers } from "../handlers/job.handler"

export const reminderWorker = new Worker(
    REMINDER_QUEUE,
    async (job) => {
        console.log("🚀 ~ job:", job)
        const handler = jobHandlers[job.name]

        if (!handler) {
            throw new Error(`Unknown job: ${job.name}`)
        }

        await handler(job)
    },
    {
        connection: redisConnection as any,
    },
)

reminderWorker.on("ready", () => {
    console.log("Worker ready")
})

reminderWorker.on("completed", (job) => {
    console.log(`Job ${job.id} has completed!`)
})

reminderWorker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} has failed with ${err.message}`)
})

reminderWorker.on("error", (err) => {
    console.error(err)
})

const gracefulShutdown = async (signal: string) => {
    console.log(`Received ${signal}, closing worker safely.`)

    await reminderWorker.close()

    console.log("Worker closed. Exiting process.")
    process.exit(0)
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"))
process.on("SIGINT", () => gracefulShutdown("SIGINT"))
