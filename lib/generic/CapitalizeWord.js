"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapitalizeWord = void 0;
const common_1 = require("@nestjs/common");
class CapitalizeWord {
    constructor(word) {
        this.word = word;
    }
    /**
     * Capitalizes the first letter of each word in the string.
     *
     * @returns {string} The capitalized string.
     * @throws {HttpException} If an error occurs during capitalization.
     */
    static create(word) {
        return new CapitalizeWord(word).capitalize();
    }
    capitalize() {
        try {
            let capitalized = [];
            const split_word = this.word.toLocaleLowerCase().split(' ');
            split_word.map((word) => {
                const words = word.charAt(0).toUpperCase() + word.slice(1);
                capitalized.push(words);
            });
            return capitalized.join(' ');
        }
        catch (e) {
            const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
            throw new common_1.HttpException(e, errorStatus);
        }
    }
    ;
}
exports.CapitalizeWord = CapitalizeWord;
;
