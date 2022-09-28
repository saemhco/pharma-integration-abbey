import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiQuery, ApiProperty, ApiResponse, ApiParam, ApiTags, ApiHeader, ApiExcludeEndpoint } from '@nestjs/swagger';
import { CreateApikeyDTO, UpdateApikeyDTO } from './dtos/api-key.dto';
import { ApikeyadminGuard } from './guards/apikeyadmin.guard';
// @ApiTags('Api-key')

@UseGuards(ApikeyadminGuard)
@Controller('api-key')
export class AuthController {
    
    constructor(private service: AuthService) { }
    @ApiExcludeEndpoint()
    @ApiOperation({ summary: 'Get all data and filters' })
    @Get('?')
    @ApiQuery({ name: 'filters', required: false, description: 'p.e: status=true' })
    async getAll(
        @Res() res,
        @Query('filters') filters: string,
    ) {
        const data = await this.service.getAll(filters);
        return res.status(HttpStatus.OK).json(data);
    }
    @ApiExcludeEndpoint()
    @ApiOperation({ summary: 'store new data' })
    @Post()
    async create(@Res() res, @Body() createDTO: CreateApikeyDTO) {
        const data = await this.service.create(createDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Successfully Created',
            data
        });
    }

    @ApiExcludeEndpoint()
    @ApiOperation({ summary: 'Get one date by ID' })
    @Get('/:id')
    @ApiParam({ name: 'id', required: true})
    async getOne(@Res() res, @Param('id') id) {
        const data = await this.service.getOne(id);
        if (!data) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json(data);
    }

    @ApiExcludeEndpoint()
    @ApiOperation({ summary: 'Update data' })
    @Put('/:id')
    @ApiParam({ name: 'id', required: true})
    async update(@Res() res, @Body() payload: UpdateApikeyDTO, @Param('id') id) {
        const updateData = await this.service.update(id, payload);
        if (!updateData) throw new NotFoundException(`Data with ID ${id} does not exist!`);
        return res.status(HttpStatus.OK).json({
            message: 'Updated Successfully',
            updateData
        });
    }
    @ApiExcludeEndpoint()
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
