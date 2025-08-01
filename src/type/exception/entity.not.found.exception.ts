import { HttpStatus } from "@/type/enum/http.status";
import { HttpException } from "@/type/exception/http.exception.js";

/**
 * Exception thrown when an entity is not found in the database.
 */
export class EntityNotFoundException extends HttpException {
    /**
     * Creates a new EntityNotFoundException.
     * @param message - A message specifying which entity was not found.
     */
    constructor(message = "Entity not found") {
        super(HttpStatus.NOT_FOUND, message, "EntityNotFoundException");
    }
}
