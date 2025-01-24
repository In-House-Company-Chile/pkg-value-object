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
exports.JoinPdf = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdf_lib_1 = require("pdf-lib");
class JoinPdf {
    constructor(inputFolder, outputFolder) {
        this.inputFolder = inputFolder;
        this.outputFolder = outputFolder;
    }
    /**
     * Joins all PDF files in the specified input folder into a single PDF file and saves it to the specified output folder.
     *
     * @param inputFolder - The path to the folder containing the PDF files to be joined.
     * @param outputFolder - The path to the folder where the resulting PDF file will be saved.
     * @returns A promise that resolves when the PDF files have been successfully joined and saved.
     * @throws {HttpException} Throws an HttpException if an error occurs during the process.
     */
    static create(inputFolder, outputFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new JoinPdf(inputFolder, outputFolder).joinPdf();
        });
    }
    joinPdf() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = fs_1.default.readdirSync(this.inputFolder);
                const pdfFiles = files.filter(elemento => {
                    const rutaElemento = path_1.default.join(this.inputFolder, elemento);
                    return fs_1.default.statSync(rutaElemento).isFile() && path_1.default.extname(elemento).toLowerCase() === '.pdf';
                });
                const pdfDoc = yield pdf_lib_1.PDFDocument.create();
                for (const file of pdfFiles) {
                    const filePath = path_1.default.join(this.inputFolder, file);
                    try {
                        const pdfBytes = fs_1.default.readFileSync(filePath);
                        const pdf = yield pdf_lib_1.PDFDocument.load(pdfBytes);
                        const pages = yield pdfDoc.copyPages(pdf, pdf.getPageIndices());
                        pages.forEach(page => {
                            pdfDoc.addPage(page);
                        });
                    }
                    catch (e) {
                        continue;
                    }
                }
                const pdfBytes = yield pdfDoc.save();
                fs_1.default.writeFileSync(this.outputFolder, pdfBytes);
            }
            catch (e) {
                const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
                throw new common_1.HttpException(e, errorStatus);
            }
        });
    }
}
exports.JoinPdf = JoinPdf;
