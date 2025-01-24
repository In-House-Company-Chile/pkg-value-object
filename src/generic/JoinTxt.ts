import { HttpException, HttpStatus } from '@nestjs/common';
import fs from 'fs';
import path from 'path';

export class JoinTxt {
    readonly inputFolder: string;
    readonly outputFolder: string;

    constructor(inputFolder: string, outputFolder: string) {
        this.inputFolder = inputFolder;
        this.outputFolder = outputFolder;
    }

    static create(inputFolder: string, outputFolder: string): void {
        return new JoinTxt(inputFolder, outputFolder).joinTxt();
    }

    joinTxt(): void {
        let joined = '';

        try {
            const files: string[] = fs.readdirSync(this.inputFolder);

            const filesTxt: string[] = files.filter(elemento => {
                const rutaElemento = path.join(this.inputFolder, elemento);
                return fs.statSync(rutaElemento).isFile() && path.extname(elemento).toLowerCase() === '.txt';
            });

            filesTxt.forEach(file => {
                const pathFile = path.join(this.inputFolder, file);
                const content: string = fs.readFileSync(pathFile, 'utf-8');
                joined += content + '\n\n';
            });

            fs.writeFileSync(this.outputFolder, joined, 'utf-8');
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    }
}