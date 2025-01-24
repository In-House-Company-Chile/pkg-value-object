export declare class DecryptData {
    readonly data: string;
    readonly hash: string;
    constructor(data: string, hash: string);
    /**
     * Decrypts the given data using the provided hash and checks if they match.
     *
     * @param data - The data to be decrypted.
     * @param hash - The hash to compare against the decrypted data.
     * @returns A promise that resolves to a boolean indicating whether the data matches the hash.
     * @throws {HttpException} If an error occurs during decryption, an HttpException is thrown with the appropriate status.
     */
    static create(data: string, hash: string): Promise<boolean>;
    decrypt(): Promise<boolean>;
}
