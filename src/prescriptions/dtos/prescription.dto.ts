import { IsArray, IsBoolean, IsBooleanString, IsDate, isEmpty, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { PartialType, ApiProperty, OmitType } from "@nestjs/swagger";
import { RecursiveTypePrescriptionEnum, StatusPrescriptionEnum } from "../enums/prescription.enum";
import { Transform } from "class-transformer";

export class CreatePrescriptionDTO {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'customer id', example:'5fbef383397696732c529e7b',type: String})
    customer: object;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'pharmacy id', example:'62e811d36d84633158cd83de',type: String})
	pharmacy: object;

	@ApiProperty({description: 'File', type:'file',required: false})
	img_url: string;

	@IsString()
	@ApiProperty({description: 'Description or notes', example:'This is a prescription for a patient', required:false })
	readonly details: string;

	@IsOptional()
	@IsEnum(StatusPrescriptionEnum)
	@ApiProperty({description: 'status', enum: StatusPrescriptionEnum, example: 'pending', required: false})
	readonly status: StatusPrescriptionEnum;

	@IsOptional()
	@Transform(({ value }) => {
		return [true, 'enabled', 'true'].indexOf(value) > -1;
	  })
	@IsBoolean()
	@ApiProperty({description: 'recursive', example: false, required: false})
	readonly recursive: boolean;

	@IsOptional()
	@IsEnum(RecursiveTypePrescriptionEnum)
	@ApiProperty({description: 'recursive type', enum: RecursiveTypePrescriptionEnum, example: 'd', required: false})
	readonly recursive_type: RecursiveTypePrescriptionEnum;

	@IsOptional()
    @Transform( ({ value }) => value && new Date(value))
    @IsDate()
	@ApiProperty({description: 'date_start', example: '2022-07-01', type:'date', required: false})
	date_start: Date;

	@IsOptional()
    @Transform( ({ value }) => value && new Date(value))
    @IsDate()
	@ApiProperty({description: 'date_end',  example: '2022-07-30', type:'date', required: false})
	date_end: Date;

}

export class UpdatePrescriptionDTO extends PartialType(
	OmitType(CreatePrescriptionDTO, ['img_url'] as const),
	) {}

export class UploadFileDTO {
	@ApiProperty({description: 'File', type:'file',required: true})
	img_url: string;
}