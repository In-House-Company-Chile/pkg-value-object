import fs from "fs";
import WordExtractor from "word-extractor";
import { HttpException, HttpStatus } from "@nestjs/common";

export class DocToTxt {
    readonly filePath: string;
    readonly outputPath: string;

    constructor(filePath: string, outputPath: string) {
        this.filePath = filePath;
        this.outputPath = outputPath;
    }

    /**
     * Extracts text content from a Word document and writes it to a specified output file.
     *
     * @param filePath - The path to the input Word document file.
     * @param outputPath - The path to the output text file where the extracted content will be saved.
     * @returns A promise that resolves when the extraction and writing process is complete.
     * @throws HttpException - Throws an HttpException with the error status if an error occurs during extraction or writing.
     */
    static async create(filePath: string, outputPath: string): Promise<void> {
        return await new DocToTxt(filePath, outputPath).extract();
    }

    async extract(): Promise<void> {
        const extractor = new WordExtractor();
        try {
            const documento = await extractor.extract(this.filePath);
            fs.writeFileSync(this.outputPath, documento.getBody());
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            throw new HttpException(e, errorStatus);
        }
    }
}