import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { CreatePharmacyDTO, UpdatePharmacyDTO } from './dtos/pharmacy.dto';
import { PharmacyService } from './pharmacy.service';
import { ApiOperation, ApiTags, ApiQuery, ApiProperty, ApiResponse, ApiParam, ApiHeader } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

@ApiTags('pharmacy')
@Controller('pharmacy')
@UseGuards(ApiKeyGuard)
@ApiHeader({
    name: 'api_key',
    description: 'Api key',
    required: true,
})
export class PharmacyController {

    constructor(private service: PharmacyService) { }

    @Get('?')
    @ApiOperation({ summary: 'Get all data and filters' })
    @ApiQuery({ name: 'filters', required: false, description: 'p.e: isVerified=true|delete=false|timeZone=America/Toronto|isOnline=true' })
    async getAll(
        @Res() res,
        @Query('filters') filters: string,
    ) {
        
        const data = await this.service.getAll(filters);
        return res.status(HttpStatus.OK).json(data);
    }

    @ApiOperation({ summary: 'store new data' })
    @Post()
    async create(@Res() res, @Body() createDTO: CreatePharmacyDTO) {
        const data = await this.service.create(createDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Successfully Created',
            data
        });
    }

    @ApiOperation({ summary: 'Get one date by ID' })
    @Get('/:id')
    @ApiParam({ name: 'id', required: true })
    async getOne(@Res() res, @Param('id') id) {
        const data = await this.service.getOne(id);
        if (!data) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json(data);
    }


    @ApiOperation({ summary: 'Update data' })
    @ApiProperty()
    @Put('/:id')
    @ApiParam({ name: 'id', required: true })
    async update(@Res() res, @Body() payload: UpdatePharmacyDTO, @Param('id') id) {
        const updateData = await this.service.update(id, payload);
        if (!updateData) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json({
            message: 'Updated Successfully',
            updateData
        });
    }

    @ApiOperation({ summary: 'Delete data' })
    @Delete('/:id')
    @ApiParam({ name: 'id', required: true })
    async delete(@Res() res, @Param('id',) id) {
        const dataDeleted = await this.service.delete(id);
        if (!dataDeleted) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json({
            message: 'Deleted Successfully',
            dataDeleted
        });
    }
}
