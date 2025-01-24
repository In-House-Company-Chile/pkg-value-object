export declare class XmlToJson {
    readonly xml: string;
    constructor(xml: string);
    /**
     * Converts an XML string to a JSON string.
     *
     * @param {string} xml - The XML string to be converted.
     * @returns {Promise<string>} A promise that resolves to the JSON string representation of the XML.
     * @throws {HttpException} Throws an HttpException if an error occurs during conversion.
     */
    static create(xml: string): Promise<unknown>;
    convert(): Promise<unknown>;
}
