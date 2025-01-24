export declare class ValidateId {
    readonly id: string;
    readonly max: number;
    constructor(id: string, max: number);
    /**
     * Validates the provided ID and ensures it does not exceed the specified maximum length.
     * If the ID is not provided, a random ID is generated and returned.
     * If the ID exceeds the maximum length, an HttpException is thrown.
     *
     * @param {string} id - The ID to be validated.
     * @param {number} max - The maximum allowed length for the ID.
     * @returns {string} - The validated ID or a randomly generated ID if the input ID is not provided.
     * @throws {HttpException} - Throws an exception if the ID exceeds the maximum length or if any other error occurs.
     */
    static create(id: string, max: number): string;
    validate(): string;
}
