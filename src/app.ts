import express from "express"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"

import reminderRoutes from "./routes/reminder.routes"
import discordRoutes from "./routes/discord.routes"
import { errorHandler } from "./middleware/error.middleware"

const app = express()

app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/reminders", reminderRoutes)
app.use("/api/discord", discordRoutes)
app.use(errorHandler)

export { app }
