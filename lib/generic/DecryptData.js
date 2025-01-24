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
exports.DecryptData = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = __importDefault(require("bcrypt"));
class DecryptData {
    constructor(data, hash) {
        this.data = data;
        this.hash = hash;
    }
    ;
    /**
     * Decrypts the given data using the provided hash and checks if they match.
     *
     * @param data - The data to be decrypted.
     * @param hash - The hash to compare against the decrypted data.
     * @returns A promise that resolves to a boolean indicating whether the data matches the hash.
     * @throws {HttpException} If an error occurs during decryption, an HttpException is thrown with the appropriate status.
     */
    static create(data, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new DecryptData(data, hash).decrypt();
        });
    }
    ;
    decrypt() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const match = yield bcrypt_1.default.compare(this.data, this.hash);
                return match;
            }
            catch (e) {
                const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
                throw new common_1.HttpException(e, errorStatus);
            }
        });
    }
    ;
}
exports.DecryptData = DecryptData;
;
