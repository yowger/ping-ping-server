import { Request, Response, NextFunction } from "express"
import { fromNodeHeaders } from "better-auth/node"

import { auth } from "../auth/auth"
import { UnauthorizedError } from "../errors/unauthorized.error"

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    })

    if (!session) {
        console.log("Unauthorized BABY")
        return next(new UnauthorizedError("Unauthorized."))
    }

    req.user = session.user
    req.session = session.session

    next()
}
