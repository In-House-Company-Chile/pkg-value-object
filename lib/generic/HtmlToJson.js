"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlToJson = void 0;
const common_1 = require("@nestjs/common");
const jsdom_1 = require("jsdom");
class HtmlToJson {
    static create(html, tag) {
        try {
            const dom = new jsdom_1.JSDOM(html);
            const divElement = dom.window.document.querySelector(tag);
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
            const errorResponse = e.response && e.response.data ? e.response.data : e;
            throw new common_1.HttpException(errorResponse, errorStatus);
        }
    }
}
exports.HtmlToJson = HtmlToJson;
