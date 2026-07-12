import { ZodObject, ZodError } from "zod"
import { Request, Response, NextFunction } from "express"

export const validate =
    (schema: ZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body)
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
