"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizeWord = void 0;
const common_1 = require("@nestjs/common");
class NormalizeWord {
    constructor(word) {
        this.word = word;
        this.word = word;
    }
    static create(word) {
        return new NormalizeWord(word).normalize();
    }
    normalize() {
        try {
            if (!this.word)
                throw new common_1.HttpException('Word is required to normalize', common_1.HttpStatus.BAD_REQUEST);
            return this.word
                .normalize('NFD')
                .toLowerCase()
                .replace(/[^a-záéíóúüñ\s]/g, '')
                .replace(/\s+/g, ' ')
                .trim()
                .split(' ');
        }
        catch (e) {
            const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
            throw new common_1.HttpException(e, errorStatus);
        }
    }
}
exports.NormalizeWord = NormalizeWord;
