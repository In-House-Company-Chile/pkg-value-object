import { HttpStatus, HttpException } from '@nestjs/common';
import { JSDOM } from 'jsdom';

export class HtmlToJson {
    static create(html: string, tag: string): any {
        try {
            const dom = new JSDOM(html);
            const divElement = dom.window.document.querySelector(tag);

            const nodeToJson = (node: any) => {
                let obj: any = {
                    attributes: [] as string[],
                    children: [] as string[]
                };

                Array.from(node.attributes || []).forEach((attr: any) => {
                    if (attr.name === 'href') obj.attributes.push(attr.value);
                });
                Array.from(node.childNodes).forEach((child: any) => {
                    if (child.nodeType === 1) {
                        obj.children.push(nodeToJson(child));
                    } else if (child.nodeType === 3) {
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
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    }
}