import { HttpException, HttpStatus } from '@nestjs/common';
import bcrypt from 'bcrypt';

export class DecryptData {
    readonly data: string;
    readonly hash: string;

    constructor(data: string, hash: string) {
        this.data = data;
        this.hash = hash;
    };

    /**
     * Decrypts the given data using the provided hash and checks if they match.
     *
     * @param data - The data to be decrypted.
     * @param hash - The hash to compare against the decrypted data.
     * @returns A promise that resolves to a boolean indicating whether the data matches the hash.
     * @throws {HttpException} If an error occurs during decryption, an HttpException is thrown with the appropriate status.
     */
    static async create(data: string, hash: string): Promise<boolean> {
        return await new DecryptData(data, hash).decrypt();
    };

    async decrypt(): Promise<boolean> {
        try {
            const match = await bcrypt.compare(this.data, this.hash);
            return match;
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            throw new HttpException(e, errorStatus);
        }
    };
};