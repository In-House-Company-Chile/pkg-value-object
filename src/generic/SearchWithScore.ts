import { HttpStatus, HttpException } from "@nestjs/common";
import stringSimilarity from "string-similarity";

export class SearchWithScore {

    readonly data: any[];
    readonly params: string[];
    readonly word: string;

    constructor(data: any[], params: string[], word: string) {
        this.data = data;
        this.params = params;
        this.word = word;
    }

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
    static create(data: any[], params: string[], word: string) {
        return new SearchWithScore(data, params, word).convert()
    }


    async convert() {
        try {
            const normalize = (word: string) => {
                try {
                    return word
                        .normalize('NFD')
                        .toLowerCase()
                        .replace(/[^a-záéíóúüñ0-9\s]/g, '') // Se agregan los números
                        .replace(/\s+/g, ' ')
                        .trim();
                } catch (e: any) {
                    throw new HttpException('Error to normalize', HttpStatus.BAD_REQUEST);
                }
            }


            const normalizedTermino = normalize(this.word.toString()); // Normalizamos el término de búsqueda

            return this.data
                .map((obj: any) => {
                    const scores = this.params.map((clave: any) => {
                        const valor = normalize(obj[clave].toString()); // Normalizamos el valor del objeto

                        if (valor === normalizedTermino) return 1;

                        return stringSimilarity.compareTwoStrings(normalizedTermino || '', valor || '');
                    });

                    const maxScore = Math.max(...scores);

                    return { ...obj, score: maxScore };
                })
                .sort((a, b) => b.score - a.score);
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            throw new HttpException(e, errorStatus);
        }
    }
}