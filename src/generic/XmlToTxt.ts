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
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    };
}
    
