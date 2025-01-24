export declare class CapitalizeWord {
    readonly word: string;
    constructor(word: string);
    /**
     * Capitalizes the first letter of each word in the string.
     *
     * @returns {string} The capitalized string.
     * @throws {HttpException} If an error occurs during capitalization.
     */
    static create(word: string): string;
    capitalize(): string;
}
