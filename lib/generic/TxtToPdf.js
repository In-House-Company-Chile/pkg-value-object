"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxtToPdf = void 0;
const fs_1 = __importDefault(require("fs"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const common_1 = require("@nestjs/common");
class TxtToPdf {
    constructor(filePath, outputPath) {
        this.filePath = filePath;
        this.outputPath = outputPath;
    }
    static create(filePath, outputPath) {
        return new TxtToPdf(filePath, outputPath).convert();
    }
    convert() {
        try {
            let txtContent = fs_1.default.readFileSync(this.filePath, 'utf-8');
            txtContent = this.cleanText(txtContent);
            const doc = new pdfkit_1.default();
            const stream = fs_1.default.createWriteStream(this.outputPath);
            doc.pipe(stream);
            doc.font('Times-Roman')
                .fontSize(12)
                .text(txtContent, {
                width: 500,
                align: 'left'
            });
            doc.end();
        }
        catch (e) {
            const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e;
            throw new common_1.HttpException(errorResponse, errorStatus);
        }
    }
    cleanText(text) {
        const accentsMap = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
            'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
            'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
            'À': 'A', 'È': 'E', 'Ì': 'I', 'Ò': 'O', 'Ù': 'U',
            'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u',
            'Ä': 'A', 'Ë': 'E', 'Ï': 'I', 'Ö': 'O', 'Ü': 'U',
            'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
            'Â': 'A', 'Ê': 'E', 'Î': 'I', 'Ô': 'O', 'Û': 'U',
            'ã': 'a', 'ñ': 'n', 'õ': 'o',
            'Ã': 'A', 'Ñ': 'N', 'Õ': 'O',
            'ç': 'c', 'Ç': 'C',
            'ß': 'ss',
            'ÿ': 'y', 'Ÿ': 'Y'
        };
        text = text.replace(/[áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜâêîôûÂÊÎÔÛãñõÃÑÕçÇßÿŸ]/g, match => accentsMap[match]);
        return text.replace(/[^\x20-\x7E]+/g, ' ');
    }
}
exports.TxtToPdf = TxtToPdf;
