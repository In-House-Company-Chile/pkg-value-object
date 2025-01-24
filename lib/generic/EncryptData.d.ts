export declare class EncryptData {
    readonly data: string;
    constructor(data: string);
    static create(data: string): Promise<string>;
    encrypt(): Promise<string>;
}
