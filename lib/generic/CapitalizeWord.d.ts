export declare class CapitalizeWord {
    readonly word: string;
    constructor(word: string);
    /**
     * Capitalizes the first letter of each word in a given string.
     *
     * @param word - The string to be capitalized.
     * @returns The capitalized string.
     * @throws HttpException - If an error occurs during the capitalization process.
     */
    static create(word: string): string;
    capitalize(): string;
}
