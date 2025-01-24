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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptData = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = __importDefault(require("bcrypt"));
class EncryptData {
    constructor(data) {
        this.data = data;
    }
    ;
    /**
     * Encrypts the provided data using bcrypt hashing algorithm.
     *
     * @param {string} data - The data to be encrypted.
     * @returns {Promise<string>} - A promise that resolves to the hashed data.
     * @throws {HttpException} - Throws an HttpException if an error occurs during encryption.
     */
    static create(data) {
        return new EncryptData(data).encrypt();
    }
    ;
    encrypt() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saltRounds = 10;
                const hashedData = yield bcrypt_1.default.hash(this.data, saltRounds);
                return hashedData;
            }
            catch (e) {
                const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
                throw new common_1.HttpException(e, errorStatus);
            }
        });
    }
    ;
}
exports.EncryptData = EncryptData;
;
