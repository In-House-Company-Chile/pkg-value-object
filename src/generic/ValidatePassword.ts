import { HttpException, HttpStatus } from "@nestjs/common";
import { EncryptData } from "./EncryptData";

export class ValidatePassword{
    readonly password: string;

    constructor(password: string){
        this.password = password;
    }

    /**
     * Validates the given password against a predefined regex pattern and encrypts it if valid.
     * 
     * @param password - The password string to be validated.
     * @returns A promise that resolves to the encrypted password string if validation is successful.
     * @throws {HttpException} If the password does not match the required format or if an error occurs during encryption.
     */
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
            throw new HttpException(e, errorStatus);
        }
    };
};