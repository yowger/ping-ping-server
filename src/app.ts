import express from "express"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"

const app = express()

app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(morgan("dev"))

export { app }
