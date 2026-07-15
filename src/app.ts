import express from "express"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"

import reminderRoutes from "./routes/reminder.routes"
// import { discordService } from "./services/discord.service"

const app = express()

app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/reminders", reminderRoutes)


// app.post("/api/discord/test", async (req, res) => {
//     // const { channelId, message } = req.body

//     // if (!channelId || !message) {
//     //     return res.status(400).json({
//     //         error: "Both channelId and message are required.",
//     //     })
//     // }

//     try {
//         await discordService.send({
//             channelId: "1526984364360208435",
//             embed: {
//                 title: "Reminder",
//                 description: "pingping",
//                 color: 0xff0000,
//             },
//             buttons: "confirmation",
//         })

//         return res.status(200).json({ message: "Message send successfully." })
//     } catch (error) {
//         console.error("Error sending message to Discord:", error)
//         return res.status(500).json({
//             error: "Failed to send message to Discord.",
//         })
//     }
// })

// app.get("/api/discord/invite", (req, res) => {
//     res.json({
//         url: discordService.generateInviteUrl(),
//     })
// })

export { app }
