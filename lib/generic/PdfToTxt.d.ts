export declare class PdfToTxt {
    readonly filePath: string;
    constructor(filePath: string);
    static create(filePath: string): Promise<void>;
    convert(): Promise<void>;
}
