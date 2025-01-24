export declare class XmlToTxt {
    readonly filePath: string;
    readonly outputPath: string;
    readonly xml: string;
    constructor(filePath: string, outputPath: string, xml: string);
    /**
     * Converts an XML string to a text file.
     *
     * @param filePath - The path where the XML file will be temporarily saved.
     * @param outputPath - The path where the resulting text file will be saved.
     * @param xml - The XML string to be converted.
     * @returns A promise that resolves when the conversion is complete.
     * @throws HttpException - Throws an exception if an error occurs during the conversion process.
     */
    static create(filePath: string, outputPath: string, xml: string): Promise<void>;
    convertToTxt(): Promise<void>;
}
