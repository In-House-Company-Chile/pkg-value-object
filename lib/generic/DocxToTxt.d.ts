export declare class DocxToTxt {
    readonly filePath: string;
    readonly outputPath: string;
    constructor(filePath: string, outputPath: string);
    /**
     * Extracts text from a DOCX file and writes it to a specified output path.
     *
     * @param filePath - The path to the DOCX file to be processed.
     * @param outputPath - The path where the extracted text will be saved.
     * @returns A promise that resolves when the extraction and writing process is complete.
     * @throws HttpException - Throws an HttpException if an error occurs during the extraction or writing process.
     */
    static create(filePath: string, outputPath: string): Promise<void>;
    extract(): Promise<void>;
}
