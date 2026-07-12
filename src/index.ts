import { app } from "./app"
import { env } from "./config/env.config"

const server = app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`)
})

process.on("SIGINT", () => {
    server.close(() => process.exit(0))
})

process.on("SIGTERM", () => {
    server.close(() => process.exit(0))
})
