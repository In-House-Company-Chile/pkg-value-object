export declare class DocToTxt {
    readonly filePath: string;
    readonly outputPath: string;
    constructor(filePath: string, outputPath: string);
    static create(filePath: string, outputPath: string): Promise<void>;
    extract(): Promise<void>;
}
