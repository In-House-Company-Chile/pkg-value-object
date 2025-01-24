export declare class JoinPdf {
    readonly inputFolder: string;
    readonly outputFolder: string;
    constructor(inputFolder: string, outputFolder: string);
    static create(inputFolder: string, outputFolder: string): Promise<void>;
    joinPdf(): Promise<void>;
}
