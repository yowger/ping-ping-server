export interface DiscordTokenResponse {
    access_token: string
    token_type: "Bearer"
    expires_in: number
    refresh_token: string
    scope: string
}

export interface DiscordUserResponse {
    id: string
    username: string
    global_name: string | null
    discriminator: string
    avatar: string | null
}

export interface DiscordGuildResponse {
    id: string
    name: string
    icon: string | null
    owner: boolean
    permissions: string
    features: string[]
}

export interface DiscordChannelResponse {
    id: string
    guild_id: string
    name: string
    type: number
    position: number
}
