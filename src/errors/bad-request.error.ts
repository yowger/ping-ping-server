import { AppError } from "./app.error"

export class BadRequestError extends AppError {
    constructor(message = "Resource not found.") {
        super(message, 400)
    }
}
