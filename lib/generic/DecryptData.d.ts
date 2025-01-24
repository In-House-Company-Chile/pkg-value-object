export declare class DecryptData {
    readonly data: string;
    readonly hash: string;
    constructor(data: string, hash: string);
    static create(data: string, hash: string): Promise<boolean>;
    decrypt(): Promise<boolean>;
}
