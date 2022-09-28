import { IsArray, IsBoolean, isEmpty, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreatePharmacyDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'first name'})
    readonly fname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'last name'})
	lname: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'full name'})
	fullname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'email', required: true, example: 'email@example.com'})
	email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({description: 'profile img'})
	profile_img: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'pharmacy name'})
	pharmacy_name: string;

    // @IsNumber()
    // @IsEmpty()
    // @ApiProperty({description: 'total jobs'})
	// total_jobs: number;

    // @IsNumber()
    // @IsEmpty()
    // @ApiProperty({description: 'active jobs'})
	// active_jobs: number;

    // @IsNumber()
    // @IsEmpty()
    // @ApiProperty({description: 'completed jobs'})
	// completed_jobs: number;

    // @IsNumber()
    // @IsEmpty()
    // @ApiProperty({description: 'avg revenue'})
	// avg_revenue: number;

    // @IsNumber()
    // @IsEmpty()
    // @ApiProperty({description: 'total expense'})
	// total_expense: number;

    // @IsNumber()
    // @IsEmpty()
    // @ApiProperty({description: 'available cabs'})
	// available_cabs: number;

    // @IsString()
    // @IsEmpty()
    // @ApiProperty({description: 'token'})
	// token: string;


	// socialType: string;
	// socialId: string;
	@IsString()
    @IsOptional()
	mobile_no: string;

	@IsString()
    @IsOptional()
	country_code: string;

	// @IsNumber()
    // @IsOptional()
	// rating_pharmacy: number;

	@IsBoolean()
	@IsOptional()
    @ApiProperty({description: 'active', default: true, required: false, type: Boolean, example: true})
	active: boolean;
	
	@IsBoolean()
	@IsOptional()
    @ApiProperty({description: 'is Verified', default: true, required: false, type: Boolean, example: true})
	isVerified: boolean;
	// delete: boolean;
	//createdAt: Date;
	
	@IsString()
    @IsOptional()
    @ApiProperty({description: 'profile img'})
	location: string;

    @IsArray()
    @IsOptional()
    @ApiProperty({description: 'lat long', type: [Number], example: [10, -50]})
	lat_long: Array<number>;// longitude then latitude


	// stripe_customerId: string;

	@IsBoolean()
	@IsOptional()
    @ApiProperty({description: 'is online', required: false, type: Boolean, example: true})
	isOnline: boolean;


	// selected_card: string;

	@IsString()
    @IsOptional()
    @ApiProperty({description: 'country'})
	country: string;

	@IsString()
    @IsOptional()
    @ApiProperty({description: 'region'})
    region: string;

	@IsString()
    @IsOptional()
    @ApiProperty({description: 'state'})
	state: string;

	@IsString()
    @IsOptional()
    @ApiProperty({description: 'city'})
	city: string;

	@IsString()
    @IsOptional()
    @ApiProperty({description: 'post code'})
	postcode: string;

	@IsString()
    @IsOptional()
    @ApiProperty({description: 'country code'})
	country_name_code: string;


	// my_jobs: object;
	// job_count: number;
	// pickup_count: number;
	// delivery_count: number;
	
	@IsString()
    @IsOptional()
    @ApiProperty({description: 'pharmacy code'})
	pharmacy_code: string;
	
	// last_paid_on: Date;
	// last_requested_payment: Date;
	// payment_request: boolean;
	// amount_payable: number;
	// accepted_job: boolean;
	// upcoming_jobs: object;
	// timeZone: string;
	// payment_due: boolean;
	// accepted_pending_counts: number;
	// language: string;
	// isSubscription: boolean;
	// available_job: number;
	// email_verified: boolean;
	// mobile_verified: boolean;
	// otp_mobile: string;
	// otp_email: string;
	// cookie_status: boolean;
	// country_flag_name: string;

	@IsString()
    @IsOptional()
    @ApiProperty({description: 'street name', required: false, example: 'pharmacy_landline_num',type: String})
	pharmacy_landline_num: string;
	// preffered_drivers : object;// drivers which are selected at last job
	// devices : object;
	// adminLoginToken: string;//ADD NEW KEY
	// privacy_policy_accept_date: Date;// policy accepted by pharmacy or not
	// assignedDrivers: object;//ASSIGN DRIVER UNDER PHARMACY
	// isSubscribedByDispatch: boolean;
	// dispatchCompanyId: object;
	// selectedAssignedDrivers : object; // dispatch drivers default selected by pharmacy
	// credentials_for_dispatch : {secret_code:string ;codeCreatedAt: Date };
	// preffered_dispatches : object;
	// emailNotifications : boolean;
	// isPharmacyTypeOnline : boolean;

    //add new key
	@IsString()
    @IsOptional()
    @ApiProperty({description: 'street name', required: false, example: 'street name',type: String})
    street_name: string;

	@IsString()
	@IsOptional()
	@ApiProperty({description: 'street number', required: false, example: 'street name',type: String})
    phone_number: string;

	@IsString()
	@IsOptional()
	@ApiProperty({description: 'fax number', required: false, example: 'fax-nnumber', type: String})
	fax_number: String;

	@IsString()
	@IsOptional()
	@ApiProperty({description: 'fax code',required: false, example: 'fax-code',type: String})
	fax_country_code: String;

	@IsEmpty()
	@ApiProperty({readOnly: true})
	is_integration: boolean;
}

export class UpdatePharmacyDTO extends PartialType(CreatePharmacyDTO) {}