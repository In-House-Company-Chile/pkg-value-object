export declare class TxtToPdf {
    readonly filePath: string;
    readonly outputPath: string;
    constructor(filePath: string, outputPath: string);
    static create(filePath: string, outputPath: string): void;
    convert(): void;
    cleanText(text: string): string;
}
