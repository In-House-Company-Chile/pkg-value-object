import { HttpException, HttpStatus } from '@nestjs/common';
import xml2js from 'xml2js';

export class XmlToJson {
  readonly xml: string;

  constructor(xml: string) {
    this.xml = xml;
  }

  static create(xml: string) {
    return new XmlToJson(xml).convert();
  }

  convert() {
    try {
      const parser = new xml2js.Parser({
        explicitArray: false,
        explicitCharkey: true,
        attrkey: '@attributes',
        tagNameProcessors: [xml2js.processors.stripPrefix]
      });

      return new Promise((resolve, reject) => {
        parser.parseString(this.xml, (err: any, result: any) => {
          if (err) {
            return reject(new Error('Error al convertir XML a JSON'));
          }
          resolve(JSON.stringify(result, null, 2));
        });
      });
    } catch (e: any) {
      const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
      const errorResponse = e.response && e.response.data ? e.response.data : e
.response;
      throw new HttpException(errorResponse, errorStatus);
    }
  }
}
