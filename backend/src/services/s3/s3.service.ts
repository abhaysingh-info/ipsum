import { ImATeapotException, Injectable, Logger } from '@nestjs/common';
import { Express } from 'express';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import ControllerWrapper from 'src/utils/ControllerWrapper';

@Injectable()
export class S3Service {
  private logger = new Logger();

  private region: string;
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>('S3_REGION') || 'ap-south-1';
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async uploadFile(file: Express.Multer.File) {
    return await ControllerWrapper(async () => {
      const key = `${file.fieldname}_${Date.now()}_${Math.ceil(
        Math.random() * 10_00_00_000,
      )}`;
      const bucket = this.configService.get<string>('S3_BUCKET');
      const input: PutObjectCommandInput = {
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };
      try {
        const response: PutObjectCommandOutput = await this.s3.send(
          new PutObjectCommand(input),
        );
        if (response.$metadata.httpStatusCode === 200) {
          return key;
        }
        throw new ImATeapotException('Failed to upload image');
      } catch (error) {
        this.logger.log('Cannot save file in S3', error);
        throw error;
      }
    });
  }
}
