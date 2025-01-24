export declare class ValidatePassword {
    readonly password: string;
    constructor(password: string);
    /**
     * Validates the given password against a predefined regex pattern and encrypts it if valid.
     *
     * @param password - The password string to be validated.
     * @returns A promise that resolves to the encrypted password string if validation is successful.
     * @throws {HttpException} If the password does not match the required format or if an error occurs during encryption.
     */
    static create(password: string): Promise<string>;
    validate(): Promise<string>;
}
