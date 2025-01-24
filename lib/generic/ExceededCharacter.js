"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceededCharacter = void 0;
const common_1 = require("@nestjs/common");
class ExceededCharacter {
    constructor(value, max) {
        this.value = value;
        this.max = max;
    }
    static create(value, max) {
        return new ExceededCharacter(value, max).validate();
    }
    validate() {
        try {
            if (this.value.length > this.max) {
                return false;
            }
            return true;
        }
        catch (e) {
            const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e;
            throw new common_1.HttpException(errorResponse, errorStatus);
        }
    }
    ;
}
exports.ExceededCharacter = ExceededCharacter;
;
