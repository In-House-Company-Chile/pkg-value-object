export declare class HtmlToJson {
    readonly html: string;
    readonly tag: string;
    constructor(html: string, tag: string);
    /**
     * Converts the given HTML string to JSON format.
     *
     * @param html - The HTML string to be converted.
     * @param tag - The tag to be used in the conversion process.
     * @returns The JSON object of the HTML string.
     * @throws {HttpException} If an error occurs during the conversion process, an HttpException is thrown with the appropriate status.
     */
    static create(html: string, tag: string): any;
    convert(): any;
}
