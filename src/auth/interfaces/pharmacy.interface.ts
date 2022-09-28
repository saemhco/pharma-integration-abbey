import { Document } from "mongoose";

export interface ApiKey extends Document {
    user: string,
	apiKey: string,
	status: boolean,
	type: string,
	createdAt: Date,
}
