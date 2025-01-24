import { HttpStatus, HttpException } from '@nestjs/common';
import { JSDOM } from 'jsdom';

export class HtmlToJson {
    readonly html: string;
    readonly tag: string;

    constructor(html: string, tag: string) {
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


    static create(html: string, tag: string): any {
        return new HtmlToJson(html, tag).convert();
    }

    convert(): any {
        try {
            const dom = new JSDOM(this.html);
            const divElement = dom.window.document.querySelector(this.tag);

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
            throw new HttpException(e, errorStatus);
        }
    }
}