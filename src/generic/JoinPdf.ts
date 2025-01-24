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

  /**
   * Joins all PDF files in the specified input folder into a single PDF file and saves it to the specified output folder.
   *
   * @param inputFolder - The path to the folder containing the PDF files to be joined.
   * @param outputFolder - The path to the folder where the resulting PDF file will be saved.
   * @returns A promise that resolves when the PDF files have been successfully joined and saved.
   * @throws {HttpException} Throws an HttpException if an error occurs during the process.
   */
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
      throw new HttpException(e, errorStatus);
    }
  }
}