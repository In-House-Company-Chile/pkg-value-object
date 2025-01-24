import { HttpException, HttpStatus } from "@nestjs/common";

export class ExceededCharacter {
    readonly value: string;
    readonly max: number;

    constructor(value: string, max: number) {
        this.value = value;
        this.max = max;
    }

    /**
     * Validates if the given string value does not exceed the specified maximum length.
     *
     * @param value - The string value to be validated.
     * @param max - The maximum allowed length for the string value.
     * @returns A boolean indicating whether the string value is within the allowed length.
     * @throws HttpException - Throws an exception with an appropriate error status and response if an error occurs during validation.
     */
    static create(value: string, max: number) {
        return new ExceededCharacter(value, max).validate();
    }

    validate() {
        try {
            if (this.value.length > this.max) {
                return false;
            }
            return true;
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            throw new HttpException(e, errorStatus);
        }
    };
};