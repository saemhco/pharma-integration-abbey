import { Document } from "mongoose";

export interface Customer extends Document {
    pharmacy_id: object;
	customer_name: string;
	customer_f_name: string;
	customer_l_name: string;
	establishment_name: string;
	phone_no: string;
	country_code: string;
	email: string;
	appartment_no: string;
	door_code: string;
	location: string;
	lat_long: {
		type: [Number],
		index: '2dsphere'
	};
	customer_type: string, // 1 for residence,2 client,3 medical center,4 other
	establishment_id: object,
	createdAt: Date,
	active: boolean,
	//delete: boolean,
	recursiveJobs: Array<object>,
	customers_count: number,
	establishment_email: string;
	establishment_country_code: string;
	establishment_phone: string;
	pickup_note: string;
	delivery_note: string;
	customer_note: string; 
}
