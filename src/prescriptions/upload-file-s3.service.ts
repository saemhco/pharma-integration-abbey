import { Injectable,InternalServerErrorException } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class UploadFileS3Service {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    s3 = new AWS.S3
    ({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    });

    async uploadFile(file)
    {
        const { originalname } = file;
        return await this.s3Upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
    }

    async s3Upload(file, bucket, name, mimetype)
    {
        const params = 
        {
            Bucket: bucket,
            Key: String(this.dinamicName(name)),
            Body: file,
            ACL: "public-read",
            ContentType: mimetype,
            ContentDisposition:"inline",
            name: name,
            CreateBucketConfiguration: 
            {
                LocationConstraint: process.env.AWS_S3_REGION
            }
        };

        try
        {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        }
        catch (error)
        {
            throw new InternalServerErrorException("Error while uploading file to S3", error);
        }
    }
    //dinamic name for file
    dinamicName(name){
        const extention = name.split('.').pop();
        const date = new Date();
        const milliseconds = date.getMilliseconds();
        const random_text = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return `${milliseconds}-${random_text}.${extention}`;
    }
}
