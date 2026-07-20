import { OAuth2Scopes, PermissionFlagsBits } from "discord.js"

export const DISCORD_API_URL = "https://discord.com/api"

export const DISCORD_BOT_PERMISSIONS =
    PermissionFlagsBits.ViewChannel |
    PermissionFlagsBits.SendMessages |
    PermissionFlagsBits.AttachFiles |
    PermissionFlagsBits.EmbedLinks

export const DISCORD_OAUTH_SCOPES = [
    OAuth2Scopes.Bot,
    OAuth2Scopes.Identify,
    OAuth2Scopes.Guilds,
].join(" ")
