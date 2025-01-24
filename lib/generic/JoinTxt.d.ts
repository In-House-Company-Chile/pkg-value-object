export declare class JoinTxt {
    readonly inputFolder: string;
    readonly outputFolder: string;
    constructor(inputFolder: string, outputFolder: string);
    static create(inputFolder: string, outputFolder: string): void;
    joinTxt(): void;
}
