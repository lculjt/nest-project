import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';

@Injectable()
export class OssService {
    private client: OSS;

    private bucket: string;

    constructor() {
        this.bucket = 'ljts-bucket';
        this.client = new OSS({
            accessKeyId: '', // 替换为你的阿里云 AccessKeyId
            accessKeySecret: '', // 替换为你的阿里云 AccessKeySecret
            bucket: this.bucket, // 替换为你的 OSS 桶名称
            region: 'oss-cn-beijing', // 替换为你的 OSS 区域
        });
    }

    async getSignature() {
        const date = new Date();
        date.setDate(date.getDate() + 1);

        const res = this.client.calculatePostSignature({
            expiration: date.toISOString(),
            conditions: [
                ["content-length-range", 0, 1048576000], //设置上传文件的大小限制。      
            ]
        });

        const location = await this.client.getBucketLocation(this.bucket);
    
        const host = `http://${this.bucket}.${location.location}.aliyuncs.com`;
        console.log(res, host);
        return {
            res, host
        }
    }
}
