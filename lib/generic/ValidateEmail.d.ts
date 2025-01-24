export declare class ValidateEmail {
    readonly email: string;
    constructor(email: string);
    /**
     * Validates the given email string to ensure it follows the standard email format.
     *
     * @param email - The email string to be validated.
     * @returns The validated email string if it is in the correct format.
     * @throws HttpException - Throws an exception if the email is invalid or if an error occurs during validation.
     */
    static create(email: string): string;
    validate(): string;
}
