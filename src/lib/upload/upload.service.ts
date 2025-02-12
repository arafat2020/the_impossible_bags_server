import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid4 } from "uuid"
import { FileInstance, User } from '@prisma/client';
import { DbService } from 'src/db/db.service';


@Injectable()
export class UploadService {
    private readonly s3Client: S3Client;

    constructor(
        private readonly config: ConfigService,
        private readonly db: DbService
    ) {
        this.s3Client = new S3Client({
            region: this.config.getOrThrow<string>('AWS_REGION'),
            endpoint: this.config.getOrThrow<string>("AWS_ENDPOINT"),
            credentials: {
                accessKeyId: this.config.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.config.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }


    async uploadFile({
        file,
        userId
    }:{
        file: Express.Multer.File,
        userId
    }): Promise<FileInstance> {
        const bucketName = this.config.getOrThrow<string>('AWS_BUCKET_NAME');
        const fileId = uuid4().toString()
        await this.s3Client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: fileId,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read', // Optional: makes the file publicly 
        }));

        // Construct the public URL
        return this.db.fileInstance.create({
            data: {
                fileUrl: await this.getPresignedUrl(fileId, 3600 * 24 * 7),
                fileId,
                bucket: bucketName,
                userId: userId
            }
        })
    }

    private async getPresignedUrl(fileName: string, expiresIn: number = 3600): Promise<string> {
        const bucketName = this.config.getOrThrow<string>('AWS_BUCKET_NAME');

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: fileName,
        });

        const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn }); // ✅ Correct usage
        return signedUrl;
    }

    async deleteFile(fileName: string): Promise<void> {
        const bucketName = this.config.getOrThrow<string>('AWS_BUCKET_NAME');

        await this.s3Client.send(new DeleteObjectCommand({
            Bucket: bucketName,
            Key: fileName,
        }));
    }
}
