import { HttpException, HttpStatus } from "@nestjs/common";

export class ExceededCharacter {
    readonly value: string;
    readonly max: number;

    constructor(value: string, max: number) {
        this.value = value;
        this.max = max;
    }

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
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    };
};