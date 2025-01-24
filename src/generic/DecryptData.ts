import { HttpException, HttpStatus } from '@nestjs/common';
import bcrypt from 'bcrypt';

export class DecryptData {
    readonly data: string;
    readonly hash: string;

    constructor(data: string, hash: string) {
        this.data = data;
        this.hash = hash;
    };

    static async create(data: string, hash: string): Promise<boolean> {
        return await new DecryptData(data, hash).decrypt();
    };

    async decrypt(): Promise<boolean> {
        try {
            const match = await bcrypt.compare(this.data, this.hash);
            return match;
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    };
};