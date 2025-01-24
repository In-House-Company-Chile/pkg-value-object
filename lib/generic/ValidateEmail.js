"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateEmail = void 0;
const common_1 = require("@nestjs/common");
class ValidateEmail {
    constructor(email) {
        this.email = email;
    }
    /**
     * Validates the given email string to ensure it follows the standard email format.
     *
     * @param email - The email string to be validated.
     * @returns The validated email string if it is in the correct format.
     * @throws HttpException - Throws an exception if the email is invalid or if an error occurs during validation.
     */
    static create(email) {
        return new ValidateEmail(email).validate();
    }
    validate() {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const result = emailRegex.test(this.email);
            if (!result)
                throw new common_1.HttpException(`invalid email '${this.email}', should be in the format example@example.com`, common_1.HttpStatus.BAD_REQUEST);
            return this.email;
        }
        catch (e) {
            const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
            throw new common_1.HttpException(e, errorStatus);
        }
    }
    ;
}
exports.ValidateEmail = ValidateEmail;
;
