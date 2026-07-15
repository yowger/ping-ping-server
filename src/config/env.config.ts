import dotenv from "dotenv"

dotenv.config()

export const env = {
    PORT: Number(process.env.PORT),
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
}
