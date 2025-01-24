import { HttpException, HttpStatus } from '@nestjs/common';
import bcrypt from 'bcrypt';

export class EncryptData {
    readonly data: string;

    constructor(data: string) {
        this.data = data;
    };

    /**
     * Encrypts the provided data using bcrypt hashing algorithm.
     *
     * @param {string} data - The data to be encrypted.
     * @returns {Promise<string>} - A promise that resolves to the hashed data.
     * @throws {HttpException} - Throws an HttpException if an error occurs during encryption.
     */
    static create(data: string): Promise<string> {
        return new EncryptData(data).encrypt();
    };

    async encrypt(): Promise<string> {
        try {
            const saltRounds = 10;
            const hashedData = await bcrypt.hash(this.data, saltRounds);
            return hashedData;
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            throw new HttpException(e, errorStatus);
        }
    };
};