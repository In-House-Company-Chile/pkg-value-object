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

    /**
     * Joins the content of all `.txt` files in the specified input folder and writes the combined content to a file in the output folder.
     *
     * @param inputFolder - The path to the folder containing the `.txt` files to be joined.
     * @param outputFolder - The path to the file where the joined content will be written.
     * @throws {HttpException} Throws an HttpException if an error occurs during file reading or writing.
     */
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
            throw new HttpException(e, errorStatus);
        }
    }
}