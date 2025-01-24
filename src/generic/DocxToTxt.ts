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

    static async create(filePath: string, outputPath: string): Promise<void> {
        return await new DocxToTxt(filePath, outputPath).extract();
    }

    async extract(): Promise<void> {
        try {
            const data = await mammoth.extractRawText({ path: this.filePath });
            fs.writeFileSync(this.outputPath, data.value);
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    }
}