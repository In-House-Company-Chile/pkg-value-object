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
            throw new HttpException(e, errorStatus);
        }
    };
};