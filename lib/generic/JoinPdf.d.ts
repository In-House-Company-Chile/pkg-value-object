export declare class JoinPdf {
    readonly inputFolder: string;
    readonly outputFolder: string;
    constructor(inputFolder: string, outputFolder: string);
    /**
     * Joins all PDF files in the specified input folder into a single PDF file and saves it to the specified output folder.
     *
     * @param inputFolder - The path to the folder containing the PDF files to be joined.
     * @param outputFolder - The path to the folder where the resulting PDF file will be saved.
     * @returns A promise that resolves when the PDF files have been successfully joined and saved.
     * @throws {HttpException} Throws an HttpException if an error occurs during the process.
     */
    static create(inputFolder: string, outputFolder: string): Promise<void>;
    joinPdf(): Promise<void>;
}
