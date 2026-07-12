import { Worker } from "bullmq"
import { redisConnection } from "../config/redis.config"

export const worker = new Worker(
    "reminders",
    async (job) => {
        console.log(job)
    },
    {
        connection: redisConnection as any,
    },
)

worker.on("completed", (job) => {
    console.log(`Job ${job.id} has completed!`)
})

worker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} has failed with ${err.message}`)
})
