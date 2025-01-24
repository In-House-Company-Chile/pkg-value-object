import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidateEmail {
    readonly email: string;

    constructor(email: string) {
        this.email = email;
    }

    /**
     * Creates a new instance of ValidateEmail and validates the given email.
     * 
     * @param email - The email to be validated.
     * @returns The validated email.
     */
    static create(email: string): string {
        return new ValidateEmail(email).validate();
    }

    /**
     * Validates the email address.
     * 
     * @returns The validated email address.
     * @throws {HttpException} If the email is invalid.
     */
    validate(): string {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const result = emailRegex.test(this.email);
            if (!result) throw new HttpException(`invalid email '${this.email}', should be in the format example@example.com`, HttpStatus.BAD_REQUEST);
            return this.email;
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    };
};

