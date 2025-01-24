import { HttpException, HttpStatus } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { PDFDocument, PDFPage } from 'pdf-lib';

export class JoinPdf {
  readonly inputFolder: string;
  readonly outputFolder: string;

  constructor(inputFolder: string, outputFolder: string) {
    this.inputFolder = inputFolder;
    this.outputFolder = outputFolder;
  }

  static async create(inputFolder: string, outputFolder: string): Promise<void> {
    return await new JoinPdf(inputFolder, outputFolder).joinPdf();
  }

  async joinPdf(): Promise<void> {
    try {
      const files: string[] = fs.readdirSync(this.inputFolder);

      const pdfFiles: string[] = files.filter(elemento => {
        const rutaElemento: string = path.join(this.inputFolder, elemento);
        return fs.statSync(rutaElemento).isFile() && path.extname(elemento).toLowerCase() === '.pdf';
      });

      const pdfDoc: PDFDocument = await PDFDocument.create();

      for (const file of pdfFiles) {
        const filePath: string = path.join(this.inputFolder, file);
        try {
          const pdfBytes: Uint8Array = fs.readFileSync(filePath);
          const pdf: PDFDocument = await PDFDocument.load(pdfBytes);
          const pages: PDFPage[] = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
          pages.forEach(page => {
            pdfDoc.addPage(page);
          });
        } catch (e: any) {
          continue;
        }
      }

      const pdfBytes: Uint8Array = await pdfDoc.save();
      fs.writeFileSync(this.outputFolder, pdfBytes);
    } catch (e: any) {
      const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
      const errorResponse = e.response && e.response.data ? e.response.data : e
.response;
      throw new HttpException(errorResponse, errorStatus);
    }
  }
}