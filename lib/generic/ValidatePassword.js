"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePassword = void 0;
const common_1 = require("@nestjs/common");
const EncryptData_1 = require("./EncryptData");
class ValidatePassword {
    constructor(password) {
        this.password = password;
    }
    /**
     * Validates the given password against a predefined regex pattern and encrypts it if valid.
     *
     * @param password - The password string to be validated.
     * @returns A promise that resolves to the encrypted password string if validation is successful.
     * @throws {HttpException} If the password does not match the required format or if an error occurs during encryption.
     */
    static create(password) {
        return new ValidatePassword(password).validate();
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/;
                const result = passwordRegex.test(this.password);
                if (!result)
                    throw new common_1.HttpException('invalid password, should be in the format Example@1234', common_1.HttpStatus.BAD_REQUEST);
                return yield EncryptData_1.EncryptData.create(this.password);
            }
            catch (e) {
                const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
                throw new common_1.HttpException(e, errorStatus);
            }
        });
    }
    ;
}
exports.ValidatePassword = ValidatePassword;
;
