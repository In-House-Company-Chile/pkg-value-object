"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateEmail = void 0;
const common_1 = require("@nestjs/common");
class ValidateEmail {
    constructor(email) {
        this.email = email;
    }
    /**
     * Creates a new instance of ValidateEmail and validates the given email.
     *
     * @param email - The email to be validated.
     * @returns The validated email.
     */
    static create(email) {
        return new ValidateEmail(email).validate();
    }
    /**
     * Validates the email address.
     *
     * @returns The validated email address.
     * @throws {HttpException} If the email is invalid.
     */
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
            const errorResponse = e.response && e.response.data ? e.response.data : e;
            throw new common_1.HttpException(errorResponse, errorStatus);
        }
    }
    ;
}
exports.ValidateEmail = ValidateEmail;
;
