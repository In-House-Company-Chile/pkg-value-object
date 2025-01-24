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
            const errorResponse = e.response && e.response.data ? e.response.data : e;
            throw new common_1.HttpException(errorResponse, errorStatus);
        }
    }
    ;
}
exports.ValidateId = ValidateId;
;
