import pdfParse from 'pdf-parse';
import fs from 'fs';

export class PdfToTxt {

    constructor(readonly filePath: string) {
        this.filePath = filePath;
    }

    static create(filePath: string) {
        return new PdfToTxt(filePath).convert()
    }


    async convert() {
        try {
            const pdfBuffer = fs.readFileSync(this.filePath);
            const data = await pdfParse(pdfBuffer);
            fs.writeFileSync(`${this.filePath.split('.pdf')[0]}.txt`, data.text);
            fs.unlinkSync(this.filePath);
        } catch (error) {
            console.error('Error al convertir el PDF a texto:', error);
            throw error;
        }
    }
}