export declare class SearchWithScore {
    readonly data: any[];
    readonly params: string[];
    readonly word: string;
    constructor(data: any[], params: string[], word: string);
    /**
     * Converts an array of objects by normalizing specified fields and calculating a similarity score
     * based on a given search term. The objects are then sorted by their similarity scores in descending order.
     *
     * @param data - The array of objects to be processed.
     * @param params - The keys of the object fields to be normalized and compared.
     * @param word - The search term to compare against the object fields.
     * @returns A promise that resolves to an array of objects with an added `score` property, sorted by score.
     * @throws Will throw an error if the conversion process fails.
     */
    static create(data: any[], params: string[], word: string): Promise<any[]>;
    convert(): Promise<any[]>;
}
