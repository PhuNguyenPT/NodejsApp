import { HttpException } from "@/type/exception/http.exception.js";

/**
 * Exception thrown when validation fails for user input or payload.
 */
export class ValidationException extends HttpException {
    public validationErrors: Record<string, string>;

    /**
     * Creates a new ValidationException with detailed validation errors.
     * @param validationErrors - An object mapping field names to error messages.
     */
    constructor(validationErrors: Record<string, string>) {
        super(400, "Validation failed", "ValidationException");
        this.validationErrors = validationErrors;
    }
}
