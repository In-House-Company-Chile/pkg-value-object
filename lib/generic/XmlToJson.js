"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlToJson = void 0;
const common_1 = require("@nestjs/common");
const xml2js_1 = __importDefault(require("xml2js"));
class XmlToJson {
    constructor(xml) {
        this.xml = xml;
    }
    static create(xml) {
        return new XmlToJson(xml).convert();
    }
    convert() {
        try {
            const parser = new xml2js_1.default.Parser({
                explicitArray: false,
                explicitCharkey: true,
                attrkey: '@attributes',
                tagNameProcessors: [xml2js_1.default.processors.stripPrefix]
            });
            return new Promise((resolve, reject) => {
                parser.parseString(this.xml, (err, result) => {
                    if (err) {
                        return reject(new Error('Error al convertir XML a JSON'));
                    }
                    resolve(JSON.stringify(result, null, 2));
                });
            });
        }
        catch (e) {
            const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e
                .response;
            throw new common_1.HttpException(errorResponse, errorStatus);
        }
    }
}
exports.XmlToJson = XmlToJson;
