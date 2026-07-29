import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import * as schema from "../database/schemas/auth-schema.schema"
import { db } from "../config/db.config"
import { getTrustedOrigins } from "../utils/get-trusted-origins.utils"
import { env } from "../config/env.config"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: getTrustedOrigins(),
    advanced: {
        disableOriginCheck: env.NODE_ENV !== "production",
    },
})
