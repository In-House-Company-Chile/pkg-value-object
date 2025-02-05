"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchWithScore = void 0;
const common_1 = require("@nestjs/common");
const string_similarity_1 = __importDefault(require("string-similarity"));
class SearchWithScore {
    constructor(data, params, word) {
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
    static create(data, params, word) {
        return new SearchWithScore(data, params, word).convert();
    }
    convert() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const normalize = (word) => {
                    try {
                        return word
                            .normalize('NFD')
                            .toLowerCase()
                            .replace(/[^a-záéíóúüñ0-9\s]/g, '') // Se agregan los números
                            .replace(/\s+/g, ' ')
                            .trim();
                    }
                    catch (e) {
                        throw new common_1.HttpException('Error to normalize', common_1.HttpStatus.BAD_REQUEST);
                    }
                };
                const normalizedTermino = normalize(this.word.toString()); // Normalizamos el término de búsqueda
                return this.data
                    .map((obj) => {
                    const scores = this.params.map((clave) => {
                        const valor = normalize(obj[clave].toString()); // Normalizamos el valor del objeto
                        if (valor === normalizedTermino)
                            return 1;
                        return string_similarity_1.default.compareTwoStrings(normalizedTermino || '', valor || '');
                    });
                    const maxScore = Math.max(...scores);
                    return Object.assign(Object.assign({}, obj), { score: maxScore });
                })
                    .sort((a, b) => b.score - a.score);
            }
            catch (e) {
                const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
                throw new common_1.HttpException(e, errorStatus);
            }
        });
    }
}
exports.SearchWithScore = SearchWithScore;
