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
exports.XmlToTxt = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const xml2js_1 = require("xml2js");
class XmlToTxt {
    constructor(filePath, outputPath, xml) {
        this.filePath = filePath;
        this.outputPath = outputPath;
        this.xml = xml;
    }
    /**
     * Converts an XML string to a text file.
     *
     * @param filePath - The path where the XML file will be temporarily saved.
     * @param outputPath - The path where the resulting text file will be saved.
     * @param xml - The XML string to be converted.
     * @returns A promise that resolves when the conversion is complete.
     * @throws HttpException - Throws an exception if an error occurs during the conversion process.
     */
    static create(filePath, outputPath, xml) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new XmlToTxt(filePath, outputPath, xml).convertToTxt();
        });
    }
    convertToTxt() {
        return __awaiter(this, void 0, void 0, function* () {
            const xmlFilePath = this.filePath;
            fs_1.default.writeFileSync(xmlFilePath, this.xml);
            try {
                const xmlContent = fs_1.default.readFileSync(xmlFilePath, 'utf-8');
                const parsedData = yield (0, xml2js_1.parseStringPromise)(xmlContent);
                const convertToString = (obj) => {
                    let result = '';
                    for (const key in obj) {
                        if (key.includes('ArchivoBinario')) {
                            continue;
                        }
                        if (typeof obj[key] === 'object') {
                            result += convertToString(obj[key]);
                        }
                        else {
                            result += `${obj[key]}\n`;
                        }
                    }
                    return result;
                };
                const textContent = convertToString(parsedData);
                fs_1.default.writeFileSync(this.outputPath, textContent.trim());
            }
            catch (e) {
                const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
                throw new common_1.HttpException(e, errorStatus);
            }
        });
    }
    ;
}
exports.XmlToTxt = XmlToTxt;
