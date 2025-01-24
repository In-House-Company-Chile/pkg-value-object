export declare class ValidateEmail {
    readonly email: string;
    constructor(email: string);
    /**
     * Creates a new instance of ValidateEmail and validates the given email.
     *
     * @param email - The email to be validated.
     * @returns The validated email.
     */
    static create(email: string): string;
    /**
     * Validates the email address.
     *
     * @returns The validated email address.
     * @throws {HttpException} If the email is invalid.
     */
    validate(): string;
}
