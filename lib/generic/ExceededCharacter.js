"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceededCharacter = void 0;
const common_1 = require("@nestjs/common");
class ExceededCharacter {
    constructor(value, max) {
        this.value = value;
        this.max = max;
    }
    /**
     * Validates if the given string value does not exceed the specified maximum length.
     *
     * @param value - The string value to be validated.
     * @param max - The maximum allowed length for the string value.
     * @returns A boolean indicating whether the string value is within the allowed length.
     * @throws HttpException - Throws an exception with an appropriate error status and response if an error occurs during validation.
     */
    static create(value, max) {
        return new ExceededCharacter(value, max).validate();
    }
    validate() {
        try {
            if (this.value.length > this.max) {
                return false;
            }
            return true;
        }
        catch (e) {
            const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
            throw new common_1.HttpException(e, errorStatus);
        }
    }
    ;
}
exports.ExceededCharacter = ExceededCharacter;
;
