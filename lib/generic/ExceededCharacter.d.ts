export declare class ExceededCharacter {
    readonly value: string;
    readonly max: number;
    constructor(value: string, max: number);
    static create(value: string, max: number): boolean;
    validate(): boolean;
}
