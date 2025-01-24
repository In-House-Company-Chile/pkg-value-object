import { HttpException, HttpStatus } from '@nestjs/common';
import fs from 'fs';
import { parseStringPromise } from 'xml2js';

export class XmlToTxt {
    readonly filePath: string;
    readonly outputPath: string;
    readonly xml: string;

    constructor(filePath: string, outputPath: string, xml: string) {
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
    static async create(filePath: string, outputPath: string, xml: string): Promise<void> {
        return await new XmlToTxt(filePath, outputPath, xml).convertToTxt();
    }

    async convertToTxt(): Promise<void> {
        const xmlFilePath = this.filePath;
        fs.writeFileSync(xmlFilePath, this.xml);
        try {
            const xmlContent = fs.readFileSync(xmlFilePath, 'utf-8');
    
            const parsedData = await parseStringPromise(xmlContent);
        
            const convertToString = (obj: any) => {
                let result = '';
                for (const key in obj) {
                    if (key.includes('ArchivoBinario')) {
                        continue;
                    }
                    if (typeof obj[key] === 'object') {
                        result += convertToString(obj[key]);
                    } else {
                        result += `${obj[key]}\n`;
                    }
                }
                return result;
            };
    
            const textContent = convertToString(parsedData);
    
            fs.writeFileSync(this.outputPath, textContent.trim());
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            throw new HttpException(e, errorStatus);
        }
    };
}
    
