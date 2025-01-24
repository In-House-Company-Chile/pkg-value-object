export declare class JoinTxt {
    readonly inputFolder: string;
    readonly outputFolder: string;
    constructor(inputFolder: string, outputFolder: string);
    /**
     * Joins the content of all `.txt` files in the specified input folder and writes the combined content to a file in the output folder.
     *
     * @param inputFolder - The path to the folder containing the `.txt` files to be joined.
     * @param outputFolder - The path to the file where the joined content will be written.
     * @throws {HttpException} Throws an HttpException if an error occurs during file reading or writing.
     */
    static create(inputFolder: string, outputFolder: string): void;
    joinTxt(): void;
}
