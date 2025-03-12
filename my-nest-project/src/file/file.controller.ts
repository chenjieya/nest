import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileInterface } from './interfaces/file.interface';

@Controller('/file')
export class FileController {
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: { originalname: string; size: number },
    @Body('additionalParams') additionalParams: string,
  ): FileInterface {
    console.log('Received file:', file);
    console.log('Additional parameters:', JSON.parse(additionalParams));

    return {
      name: file.originalname,
      age: file.size,
      success: 'success',
    };
  }
}
