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
exports.DocToTxt = void 0;
const fs_1 = __importDefault(require("fs"));
const word_extractor_1 = __importDefault(require("word-extractor"));
const common_1 = require("@nestjs/common");
class DocToTxt {
    constructor(filePath, outputPath) {
        this.filePath = filePath;
        this.outputPath = outputPath;
    }
    static create(filePath, outputPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new DocToTxt(filePath, outputPath).extract();
        });
    }
    extract() {
        return __awaiter(this, void 0, void 0, function* () {
            const extractor = new word_extractor_1.default();
            try {
                const documento = yield extractor.extract(this.filePath);
                fs_1.default.writeFileSync(this.outputPath, documento.getBody());
            }
            catch (e) {
                const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
                const errorResponse = e.response && e.response.data ? e.response.data : e;
                throw new common_1.HttpException(errorResponse, errorStatus);
            }
        });
    }
}
exports.DocToTxt = DocToTxt;
