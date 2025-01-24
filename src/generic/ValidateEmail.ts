import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidateEmail {
    readonly email: string;

    constructor(email: string) {
        this.email = email;
    }

    /**
     * Validates the given email string to ensure it follows the standard email format.
     *
     * @param email - The email string to be validated.
     * @returns The validated email string if it is in the correct format.
     * @throws HttpException - Throws an exception if the email is invalid or if an error occurs during validation.
     */
    static create(email: string): string {
        return new ValidateEmail(email).validate();
    }
    validate(): string {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const result = emailRegex.test(this.email);
            if (!result) throw new HttpException(`invalid email '${this.email}', should be in the format example@example.com`, HttpStatus.BAD_REQUEST);
            return this.email;
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            throw new HttpException(e, errorStatus);
        }
    };
};

