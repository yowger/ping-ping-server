import dotenv from "dotenv"

dotenv.config()

export const env = {
    PORT: Number(process.env.PORT),
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
    DISCORD_APP_ID: process.env.DISCORD_APP_ID,
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
}
