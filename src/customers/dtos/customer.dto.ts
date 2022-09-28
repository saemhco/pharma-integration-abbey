import { IsArray, IsBoolean, isEmpty, IsEmpty, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDTO {
	// @IsObject()
	// @IsNotEmpty()
	// @ApiProperty({description: 'pharmacy id'})
    // pharmacy_id: object;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'customer name'})
	customer_name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'customer first name'})
	customer_f_name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'customer last name'})
	customer_l_name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'establishment name'})
	establishment_name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'phone number'})
	phone_no: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'country code'})
	country_code: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'email'})
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'appartment number'})
	appartment_no: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'door code'})
	door_code: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'location'})
	location: string;

	@IsArray()
	@IsNotEmpty()
	@ApiProperty({description: 'lat long', type: [Number], example: [10, -50]})
	lat_long: Array<number>;// longitude then latitude

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'customer type: 1 for residence,2 client,3 medical center,4 other', example: '1'})
	customer_type: string; // 1 for residence,2 client,3 medical center,4 other

	// @IsString()
	// @ApiProperty({description: 'establishment id'})
	// establishment_id: object;

	@IsBoolean()
	@IsNotEmpty()
	@ApiProperty({description: 'active', example: true})
	active: boolean;

	//delete: boolean,
	@IsArray()
	@IsNotEmpty()
	@ApiProperty({description: 'recursive jobs', type: [Object]})
	recursiveJobs: Array<object>;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({description: 'customers count', example: 1})
	customers_count: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'establishment email'})
	establishment_email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'establishment country code'})
	establishment_country_code: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'establishment phone'})
	establishment_phone: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'pickup note'})
	pickup_note: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'delivery note'})
	delivery_note: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({description: 'customer note'})
	customer_note: string; 
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}