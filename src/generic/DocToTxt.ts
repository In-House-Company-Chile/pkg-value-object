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
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    }
}