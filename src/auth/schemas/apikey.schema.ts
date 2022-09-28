import { Schema } from "mongoose";
import { TypeEnum } from "../enums/prescription.enum";

export const ApiKeySchema = new Schema({    
	user: { 
		type: String, 
		// trim: true,
		// lowercase: true,
		// unique: false,
		},
	apiKey: { 
			type: String, 
			trim: true,
			lowercase: true,
			unique: true,
			},
	status: { type: Boolean, default: true },
	type: { type: String, enum: TypeEnum },
	createdAt: { type: Date, default: Date.now },
});


