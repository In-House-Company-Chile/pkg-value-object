import fs from "fs";
import mammoth from "mammoth";
import { HttpException, HttpStatus } from "@nestjs/common";

export class DocxToTxt {
    readonly filePath: string;
    readonly outputPath: string;

    constructor(filePath: string, outputPath: string) {
        this.filePath = filePath;
        this.outputPath = outputPath;
    }

    /**
     * Extracts text from a DOCX file and writes it to a specified output path.
     *
     * @param filePath - The path to the DOCX file to be processed.
     * @param outputPath - The path where the extracted text will be saved.
     * @returns A promise that resolves when the extraction and writing process is complete.
     * @throws HttpException - Throws an HttpException if an error occurs during the extraction or writing process.
     */
    static async create(filePath: string, outputPath: string): Promise<void> {
        return await new DocxToTxt(filePath, outputPath).extract();
    }

    async extract(): Promise<void> {
        try {
            const data = await mammoth.extractRawText({ path: this.filePath });
            fs.writeFileSync(this.outputPath, data.value);
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            throw new HttpException(e, errorStatus);
        }
    }
}