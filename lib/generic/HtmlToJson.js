"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlToJson = void 0;
const common_1 = require("@nestjs/common");
const jsdom_1 = require("jsdom");
class HtmlToJson {
    constructor(html, tag) {
        this.html = html;
        this.tag = tag;
    }
    /**
     * Converts the given HTML string to JSON format.
     *
     * @param html - The HTML string to be converted.
     * @param tag - The tag to be used in the conversion process.
     * @returns The JSON object of the HTML string.
     * @throws {HttpException} If an error occurs during the conversion process, an HttpException is thrown with the appropriate status.
     */
    static create(html, tag) {
        return new HtmlToJson(html, tag).convert();
    }
    convert() {
        try {
            const dom = new jsdom_1.JSDOM(this.html);
            const divElement = dom.window.document.querySelector(this.tag);
            const nodeToJson = (node) => {
                let obj = {
                    attributes: [],
                    children: []
                };
                Array.from(node.attributes || []).forEach((attr) => {
                    if (attr.name === 'href')
                        obj.attributes.push(attr.value);
                });
                Array.from(node.childNodes).forEach((child) => {
                    if (child.nodeType === 1) {
                        obj.children.push(nodeToJson(child));
                    }
                    else if (child.nodeType === 3) {
                        const trimmedText = child.textContent.trim();
                        if (trimmedText) {
                            obj.children.push(trimmedText);
                        }
                    }
                });
                return obj;
            };
            const divJson = nodeToJson(divElement);
            return divJson;
        }
        catch (e) {
            const errorStatus = e.status ? e.status : common_1.HttpStatus.BAD_REQUEST;
            throw new common_1.HttpException(e, errorStatus);
        }
    }
}
exports.HtmlToJson = HtmlToJson;
