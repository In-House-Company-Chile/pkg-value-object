export declare class TxtToPdf {
    readonly filePath: string;
    readonly outputPath: string;
    constructor(filePath: string, outputPath: string);
    /**
     * Converts a text file to a PDF file.
     *
     * @param {string} filePath - The path to the input text file.
     * @param {string} outputPath - The path to the output PDF file.
     * @throws {HttpException} Throws an HttpException if an error occurs during the conversion process.
     */
    static create(filePath: string, outputPath: string): void;
    convert(): void;
    cleanText(text: string): string;
}
