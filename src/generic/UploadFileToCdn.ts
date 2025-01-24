import config from '@app/config';
import { s3 } from '@app/config/cdnDo';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UploadFileToCdn {
    readonly file: any;

    constructor(file: any) {
        this.file = file;
    }

    static async create(file: any) {
        return await new UploadFileToCdn(file).upload();
    }

    async upload() {
        try {
            const file = this.file;
            if (!file) throw new HttpException('No se subió ningún archivo.', HttpStatus.BAD_REQUEST)

            const date = Date.now()

            const params: any = {
                Bucket: config.DO.BUCKET,
                Key: `files/${date}_${file.originalname}`,
                Body: file.buffer,
                ACL: 'public-read',
                ContentType: file.mimetype
            };

            const command = new PutObjectCommand(params);
            await s3.send(command);

            return `https://normativa.nyc3.cdn.digitaloceanspaces.com/files/${date}_${file.originalname}`;
        } catch (e: any) {
            const errorStatus = e.status ? e.status : HttpStatus.BAD_REQUEST;
            const errorResponse = e.response && e.response.data ? e.response.data : e
            throw new HttpException(errorResponse, errorStatus);
        }
    }
}
