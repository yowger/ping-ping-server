import { ZodTypeAny, ZodError } from "zod"
import { Request, Response, NextFunction } from "express"

type ValidationTarget = "body" | "params" | "query"

export const validate =
    (schema: ZodTypeAny, target: ValidationTarget = "body") =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req[target] = schema.parse(req[target])

            next()
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Validation failed.",
                    errors: error.flatten().fieldErrors,
                })
            }

            return res.status(500).json({
                message: "Internal server error.",
            })
        }
    }
