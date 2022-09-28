import { IsArray, IsBoolean, isEmpty, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PartialType, ApiProperty, OmitType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { TypeEnum } from "../enums/prescription.enum";

export class CreateApikeyDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'user name or email'})
    readonly user: string;

    @Transform(({ value }) => {
		return [true, 'enabled', 'true'].indexOf(value) > -1;
	})
	@IsBoolean()
	@IsOptional()
    @ApiProperty({readOnly: true, description: 'status', default: true, required: false, type: Boolean, example: true})
	status: boolean;

	@IsNotEmpty()
	@IsEnum(TypeEnum)
	@ApiProperty({description: 'type', enum: TypeEnum, example: 'integration', required: true})
	type: TypeEnum;
}

export class UpdateApikeyDTO {
    @Transform(({ value }) => {
		return [true, 'enabled', 'true'].indexOf(value) > -1;
	})
	@IsBoolean()
	@IsNotEmpty()
    @ApiProperty({description: 'status', default: true, required: false, type: Boolean, example: true})
	status: boolean;
}
    