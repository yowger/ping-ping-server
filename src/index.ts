import { app } from "./app"
import { connectDiscord } from "./config/discord.config"
import { env } from "./config/env.config"

async function bootstrap() {
    await connectDiscord()

    const server = app.listen(env.PORT, () => {
        console.log(`Server listening on port ${env.PORT}`)
    })

    process.on("SIGINT", () => {
        server.close(() => process.exit(0))
    })

    process.on("SIGTERM", () => {
        server.close(() => process.exit(0))
    })
}

bootstrap()
