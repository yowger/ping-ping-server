import { env } from "../config/env.config"

export function getTrustedOrigins(): string[] {
    return env
        .TRUSTED_ORIGINS!.split(",")
        .map((origin: string) => origin.trim())
}
