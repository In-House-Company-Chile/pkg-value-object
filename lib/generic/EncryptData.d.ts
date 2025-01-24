export declare class EncryptData {
    readonly data: string;
    constructor(data: string);
    /**
     * Encrypts the provided data using bcrypt hashing algorithm.
     *
     * @param {string} data - The data to be encrypted.
     * @returns {Promise<string>} - A promise that resolves to the hashed data.
     * @throws {HttpException} - Throws an HttpException if an error occurs during encryption.
     */
    static create(data: string): Promise<string>;
    encrypt(): Promise<string>;
}
