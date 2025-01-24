import { HttpException, HttpStatus } from '@nestjs/common';
import xml2js from 'xml2js';

export class XmlToJson {
  readonly xml: string;

  constructor(xml: string) {
    this.xml = xml;
  }

  /**
   * Converts an XML string to a JSON string.
   *
   * @param {string} xml - The XML string to be converted.
   * @returns {Promise<string>} A promise that resolves to the JSON string representation of the XML.
   * @throws {HttpException} Throws an HttpException if an error occurs during conversion.
   */
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
      throw new HttpException(e, errorStatus);
    }
  }
}
