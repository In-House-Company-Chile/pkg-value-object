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
exports.PdfToTxt = void 0;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const fs_1 = __importDefault(require("fs"));
class PdfToTxt {
    constructor(filePath) {
        this.filePath = filePath;
        this.filePath = filePath;
    }
    static create(filePath) {
        return new PdfToTxt(filePath).convert();
    }
    convert() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pdfBuffer = fs_1.default.readFileSync(this.filePath);
                const data = yield (0, pdf_parse_1.default)(pdfBuffer);
                fs_1.default.writeFileSync(`${this.filePath.split('.pdf')[0]}.txt`, data.text);
                fs_1.default.unlinkSync(this.filePath);
            }
            catch (error) {
                console.error('Error al convertir el PDF a texto:', error);
                throw error;
            }
        });
    }
}
exports.PdfToTxt = PdfToTxt;
