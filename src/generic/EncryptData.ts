import { HttpException, HttpStatus } from '@nestjs/common';
import bcrypt from 'bcrypt';

export class EncryptData {
    readonly data: string;

    constructor(data: string) {
        this.data = data;
    };

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
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    };
};