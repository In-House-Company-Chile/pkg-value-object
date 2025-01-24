"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateId = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const ExceededCharacter_1 = require("./ExceededCharacter");
class ValidateId {
    constructor(id, max) {
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
    static create(id, max) {
        return new ValidateId(id, max).validate();
    }
    validate() {
        try {
            const randomId = Array.from((0, crypto_1.randomBytes)(16)).map(byte => byte.toString(10)).join('').slice(0, 32);
            if (!this.id)
                return randomId;
            if (!ExceededCharacter_1.ExceededCharacter.create(this.id, this.max))
                throw new common_1.HttpException(`invalid id ${this.id} should be less than ${this.max} characters`, common_1.HttpStatus.BAD_REQUEST);
            return this.id;
        }
        catch (e) {
            const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
            throw new common_1.HttpException(e, errorStatus);
        }
    }
    ;
}
exports.ValidateId = ValidateId;
;
