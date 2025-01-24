export declare class DocToTxt {
    readonly filePath: string;
    readonly outputPath: string;
    constructor(filePath: string, outputPath: string);
    /**
     * Extracts text content from a Word document and writes it to a specified output file.
     *
     * @param filePath - The path to the input Word document file.
     * @param outputPath - The path to the output text file where the extracted content will be saved.
     * @returns A promise that resolves when the extraction and writing process is complete.
     * @throws HttpException - Throws an HttpException with the error status if an error occurs during extraction or writing.
     */
    static create(filePath: string, outputPath: string): Promise<void>;
    extract(): Promise<void>;
}
