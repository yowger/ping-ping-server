import express from "express"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"
import { toNodeHandler } from "better-auth/node"
import cors from "cors"

import reminderRoutes from "./routes/reminder.routes"
import discordRoutes from "./routes/discord.routes"
import discordConnectionRoutes from "./routes/discord-connection.routes"
import { errorHandler } from "./middleware/error.middleware"
import { auth } from "./auth/auth"
import { getTrustedOrigins } from "./utils/get-trusted-origins.utils"

const app = express()

app.use(compression())
app.use(helmet())
app.use(morgan("dev"))
app.use(
    cors({
        origin: getTrustedOrigins(),
        credentials: true,
    }),
)

app.all("/api/{*auth}", toNodeHandler(auth))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/reminders", reminderRoutes)
app.use("/api/discord", discordRoutes)
app.use("/api/discord/connections", discordConnectionRoutes)
app.use(errorHandler)

export { app }
