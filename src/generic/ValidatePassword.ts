import { HttpException, HttpStatus } from "@nestjs/common";
import { EncryptData } from "./EncryptData";

export class ValidatePassword{
    readonly password: string;

    constructor(password: string){
        this.password = password;
    }

    static create(password: string): Promise<string> {
        return new ValidatePassword(password).validate();
    }

    async validate(): Promise<string> {
        try {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/;
            const result = passwordRegex.test(this.password);
            if (!result) throw new HttpException('invalid password, should be in the format Example@1234', HttpStatus.BAD_REQUEST);
            return await EncryptData.create(this.password);
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    };
};