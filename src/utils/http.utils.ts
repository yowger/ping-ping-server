import { Request } from "express"

export function getAccessToken(req: Request): string {
    const accessToken = req.headers.authorization?.replace("Bearer ", "")

    if (!accessToken) {
        throw new Error("Missing access token.")
    }

    return accessToken
}
