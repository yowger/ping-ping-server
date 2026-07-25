import { AppError } from "./app.error"

export class ExternalServiceError extends AppError {
    constructor(message = "External service error.") {
        super(message, 503)
    }
}
