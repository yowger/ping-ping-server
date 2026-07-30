import "express"

import type { auth } from "../auth/auth"

type Session = Awaited<ReturnType<typeof auth.api.getSession>>

declare global {
    namespace Express {
        interface Request {
            user: NonNullable<Session>["user"]
            session: NonNullable<Session>["session"]
        }
    }
}
