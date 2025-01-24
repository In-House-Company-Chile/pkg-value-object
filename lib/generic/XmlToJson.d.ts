export declare class XmlToJson {
    readonly xml: string;
    constructor(xml: string);
    static create(xml: string): Promise<unknown>;
    convert(): Promise<unknown>;
}
