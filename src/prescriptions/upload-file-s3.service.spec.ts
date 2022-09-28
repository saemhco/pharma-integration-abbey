import { Test, TestingModule } from '@nestjs/testing';
import { UploadFileS3Service } from './upload-file-s3.service';

describe('UploadFileS3Service', () => {
  let service: UploadFileS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadFileS3Service],
    }).compile();

    service = module.get<UploadFileS3Service>(UploadFileS3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
