import express from "express"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"

import reminderRoutes from "./routes/reminder.routes"

const app = express()

app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/reminders", reminderRoutes)

export { app }
