export declare class ExceededCharacter {
    readonly value: string;
    readonly max: number;
    constructor(value: string, max: number);
    /**
     * Validates if the given string value does not exceed the specified maximum length.
     *
     * @param value - The string value to be validated.
     * @param max - The maximum allowed length for the string value.
     * @returns A boolean indicating whether the string value is within the allowed length.
     * @throws HttpException - Throws an exception with an appropriate error status and response if an error occurs during validation.
     */
    static create(value: string, max: number): boolean;
    validate(): boolean;
}
