export declare class ValidatePassword {
    readonly password: string;
    constructor(password: string);
    static create(password: string): Promise<string>;
    validate(): Promise<string>;
}
