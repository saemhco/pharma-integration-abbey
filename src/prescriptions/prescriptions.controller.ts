import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { CreatePrescriptionDTO, UpdatePrescriptionDTO, UploadFileDTO } from './dtos/prescription.dto';
import { PrescriptionService } from './prescriptions.service';
import { UploadFileS3Service } from './upload-file-s3.service';

@ApiTags('prescription')
@Controller('prescription')
@UseGuards(ApiKeyGuard)
@ApiHeader({
    name: 'api_key',
    description: 'Api key',
    required: true,
})
export class PrescriptionsController {
    constructor(private service: PrescriptionService, private uploadFile: UploadFileS3Service) { }

    @Get('?')
    @ApiOperation({ summary: 'Get all data and filters' })
    @ApiQuery({ name: 'filters', required: false, description: 'p.e. postal_code=postal_code-02' })
    async getAll(
        @Res() res,
        @Query('filters') filters: string,
    ) {
        const data = await this.service.getAll(filters);
        return res.status(HttpStatus.OK).json(data);
    }

    @ApiOperation({ summary: 'store new data' })
    @Post()
    @UseInterceptors(FileInterceptor('img_url'))
    @ApiConsumes('multipart/form-data')
    async create(
        @Res() res, 
        @Body() payload: CreatePrescriptionDTO, 
        @UploadedFile() img_url: Express.Multer.File
    ) {
        //if file exist
        if (img_url) {
            payload.img_url = (await this.uploadFile.uploadFile(img_url)).Location; 
        }
        const data = await this.service.create(payload);
        return res.status(HttpStatus.OK).json({
            message: 'Successfully Created',
            data
        });
    }
    
    @ApiOperation({ summary: 'Get one date by ID' })
    @Get('/:id')
    @ApiParam({ name: 'id', required: true, description: 'ID of the prescription, p.e. 63234f0abd39d74eb1d651f9' })
    async getOne(@Res() res, @Param('id') id) {
        const data = await this.service.getOne(id);
        if (!data) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json(data);
    }

    
    @ApiOperation({ summary: 'Update data (whitout file)' })
    @ApiParam({name: 'id', required: true, description: 'ID of the prescription, p.e. 63234f0abd39d74eb1d651f9' })
    @Put('/:id')
    async update(
            @Res() res, 
            @Body() payload: UpdatePrescriptionDTO, 
            @Param('id') id,
        ) {
        console.log(payload);
        const updateData = await this.service.update(id, payload);
        if (!updateData) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json({
            message: 'Updated Successfully',
            updateData
        });
    }

    @ApiOperation({ summary: 'Update only file' })
    @ApiParam({name: 'id', required: true, description: 'ID of the prescription, p.e. 63234f0abd39d74eb1d651f9' })
    @UseInterceptors(FileInterceptor('img_url'))
    @ApiConsumes('multipart/form-data')
    @Post('/:id/upload-file')
    async updateFile(
            @Res() res, 
            @Body() payload: UploadFileDTO, 
            @Param('id') id,
            @UploadedFile() img_url: Express.Multer.File
        ) {
        if (img_url) {
            payload.img_url = (await this.uploadFile.uploadFile(img_url)).Location; 
        }
        const updateData = await this.service.uploadFile(id, payload);
        if (!updateData) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json({
            message: 'Updated Successfully',
            updateData
        });
    }

    @ApiOperation({ summary: 'Delete data' })
    @ApiParam({ name: 'id', required: true, example: '63234f0abd39d74eb1d651f9' })
    @Delete('/:id')
    async delete(@Res() res, @Param('id',) id) {
        const dataDeleted = await this.service.delete(id);
        if (!dataDeleted) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json({
            message: 'Deleted Successfully',
            dataDeleted
        });
    }
}
