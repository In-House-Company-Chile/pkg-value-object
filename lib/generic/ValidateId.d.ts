export declare class ValidateId {
    readonly id: string;
    readonly max: number;
    constructor(id: string, max: number);
    static create(id: string, max: number): string;
    validate(): string;
}
