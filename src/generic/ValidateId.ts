import { HttpException, HttpStatus } from "@nestjs/common";
import { randomBytes } from "crypto";
import { ExceededCharacter } from "./ExceededCharacter";

export class ValidateId{
    readonly id: string;
    readonly max: number;

    constructor(id: string, max: number){
        this.id = id;
        this.max = max;
    }

    static create(id: string, max: number): string{
        return new ValidateId(id, max).validate();
    }

    validate(): string {
        try {
            const randomId = Array.from(randomBytes(16)).map(byte => byte.toString(10)).join('').slice(0, 32);
            if (!this.id) return randomId;
            if (!ExceededCharacter.create(this.id, this.max)) throw new HttpException(`invalid id ${this.id} should be less than ${this.max} characters`, HttpStatus.BAD_REQUEST)
            return this.id;
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    };
};