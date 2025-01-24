import { HttpException, HttpStatus } from "@nestjs/common";

export class CapitalizeWord{
    readonly word: string;

    constructor(word: string){
        this.word = word;
    }

    /**
     * Capitalizes the first letter of each word in the string.
     *
     * @returns {string} The capitalized string.
     * @throws {HttpException} If an error occurs during capitalization.
     */
    static create(word: string): string{
        return new CapitalizeWord(word).capitalize();
    }

    capitalize(): string{
        try {
            let capitalized: string[] = [];
            const split_word = this.word.toLocaleLowerCase().split(' ');
            split_word.map((word) => {
                const words = word.charAt(0).toUpperCase() + word.slice(1);
                capitalized.push(words);
            });
            return capitalized.join(' ');
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            throw new HttpException(e, errorStatus);
        }
    };
};