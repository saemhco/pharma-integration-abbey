import { Document } from "mongoose";

export interface Prescription extends Document {
    customer: object;
	pharmacy: object;
	img_url: string;
	details: string;
	status: string;
	recursive: Boolean,
	recursive_type: string,
	date_start: Date,
	date_end: Date,
	createdAt: Date;
}
