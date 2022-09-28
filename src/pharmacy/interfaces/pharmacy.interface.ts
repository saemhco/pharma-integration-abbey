import { Document } from "mongoose";

export interface Pharmacy extends Document {
    fname: string,
	lname: string,
	fullname: string,
	email: { 
		type: String, 
		trim: true,
		lowercase: true,
		unique: true,
		},
	password: string,
	profile_img: string,
	pharmacy_name: string,
	// total_jobs: number,
	// active_jobs: number,
	// completed_jobs: number,
	// avg_revenue: number,
	// total_expense: number,
	// available_cabs: number,
	// token: string,
	// socialType: string,
	// socialId: string,
	mobile_no: string,
	country_code: string,
	rating_pharmacy: number,
	active: boolean,
	isVerified: boolean,
	// delete: boolean,
	createdAt: Date,
	location: string,
	lat_long: {
		type: [Number],
		index: '2dsphere'
	},// longitude then latitude
	// stripe_customerId: string,
	isOnline: boolean,
	// selected_card: string,
	country: string,
    region: string,
	state: string,
	city: string,
	postcode: string,
	country_name_code: string,
	// my_jobs: [],
	// job_count: number,
	// pickup_count: number,
	// delivery_count: number,
	pharmacy_code: { 
		type: String,
	    unique: true, 
	},
	// last_paid_on: Date,
	// last_requested_payment: Date,
	// payment_request: boolean,
	// amount_payable: number,
	// accepted_job: boolean,
	// upcoming_jobs: [],
	timeZone: string,
	// payment_due: boolean,
	// accepted_pending_counts: number,
	// language: string,
	// isSubscription: boolean,
	// available_job: number,
	// email_verified: boolean,
	// mobile_verified: boolean,
	// otp_mobile: string,
	// otp_email: string,
	// cookie_status: boolean,
	// country_flag_name: string,
	pharmacy_landline_num: string,
	// preffered_drivers : [],// drivers which are selected at last job
	// devices : [{
	// 	'device_type': string,
	// 	'device_token': string
	// }],
	// adminLoginToken: string,//ADD NEW KEY
	// privacy_policy_accept_date: Date,// policy accepted by pharmacy or not
	// assignedDrivers: [],//ASSIGN DRIVER UNDER PHARMACY
	// isSubscribedByDispatch: boolean,
	// dispatchCompanyId: object,
	// selectedAssignedDrivers : [], // dispatch drivers default selected by pharmacy
	// credentials_for_dispatch : {secret_code:string ,codeCreatedAt: Date },
	// preffered_dispatches : [],
	// emailNotifications : { type: Boolean, default: true },
	// isPharmacyTypeOnline : boolean,

    //add new key
    street_name: String,
    phone_number: String,
	fax_number: String,
	fax_country_code: String,
	is_integration: Boolean,
}
