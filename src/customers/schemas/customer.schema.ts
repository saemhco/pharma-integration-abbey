import { Schema } from "mongoose";

export const CustomerSchema = new Schema({    
	pharmacy_id: { type: Schema.Types.ObjectId, ref: "users", default: "6328b9e3add68d5acaafa8a2" },
	customer_name: { type: String, default: "" },
	customer_f_name: { type: String, default: "" },
	customer_l_name: { type: String, default: "" },
	establishment_name: { type: String, default: "" },
	phone_no: { type: String, default: "" },
	country_code: { type: String, default: "" },
	email: { type: String, default: "" },
	appartment_no: { type: String, default: "" },
	door_code: { type: String, default: "" },
	location: { type: String, default: "" },
	lat_long: [],
	customer_type: { type: String, default: "1" }, // 1 for residence,2 client,3 medical center,4 other
	establishment_id: { type: Schema.Types.ObjectId, ref: "customers", default: "6328b9e3add68d5acaafa8a2" },
	createdAt: { type: Date, default: Date.now },
	active: { type: Boolean, default: true },
	delete: { type: Boolean, default: false },
	recursiveJobs: [],
	customers_count: { type: Number, default: 0 },
	establishment_email: { type: String, default: "" },
	establishment_country_code: { type: String, default: "" },
	establishment_phone: { type: String, default: "" },
	pickup_note: { type: String, default: "" },
	delivery_note: { type: String, default: "" },
	customer_note: { type: String, default: "" }    
});


