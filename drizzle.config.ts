import { defineConfig } from "drizzle-kit"

import { env } from "./src/config/env.config"

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/database/schemas/**/*.ts",
    out: "./src/database/migrations",
    dbCredentials: {
        url: env.DATABASE_URL!,
    },
})
