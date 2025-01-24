import fs from 'fs';
import PDFDocument from 'pdfkit';
import { HttpException, HttpStatus } from '@nestjs/common';

export class TxtToPdf {
    readonly filePath: string;
    readonly outputPath: string;

    constructor(filePath: string, outputPath: string) {
        this.filePath = filePath;
        this.outputPath = outputPath;
    }

    static create(filePath: string, outputPath: string): void {
        return new TxtToPdf(filePath, outputPath).convert();
    }

    convert(): void {
        try {
            let txtContent = fs.readFileSync(this.filePath, 'utf-8');
            txtContent = this.cleanText(txtContent);
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(this.outputPath);
            
            doc.pipe(stream);
            doc.font('Times-Roman')
                .fontSize(12)
                .text(txtContent, {
                    width: 500,
                    align: 'left'
                });

            doc.end();
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    }

    cleanText(text: string): string {
        const accentsMap: { [key: string]: string } = {
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