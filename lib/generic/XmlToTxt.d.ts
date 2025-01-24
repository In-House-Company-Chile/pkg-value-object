export declare class XmlToTxt {
    readonly filePath: string;
    readonly outputPath: string;
    readonly xml: string;
    constructor(filePath: string, outputPath: string, xml: string);
    static create(filePath: string, outputPath: string, xml: string): Promise<void>;
    convertToTxt(): Promise<void>;
}
