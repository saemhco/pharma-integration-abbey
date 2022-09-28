import { RecursiveTypePrescriptionEnum, StatusPrescriptionEnum } from "../prescriptions/enums/prescription.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";
import { Document, now, Types, SchemaTypes } from "mongoose";

export type PrescriptionDocument = Prescription & Document;
@Schema()
export class Prescription {
	@Prop({ type: SchemaTypes.ObjectId, ref: 'customers' })
    customer: Types.ObjectId;

	@Prop({ type: SchemaTypes.ObjectId, ref: 'users' })
	pharmacy: Types.ObjectId;

	@Prop()
	img_url: string;

	@Prop()
	details: string;

	@Prop({type: String, enum: StatusPrescriptionEnum, default: StatusPrescriptionEnum.pending})
	status: string;

	@Prop()
	recursive: boolean;

	@Prop({type: String, enum: RecursiveTypePrescriptionEnum, default: ''})
	recursive_type: string;

	@Prop({default: ''})
	date_start: Date;

	@Prop({default: ''})
	date_end: Date;

	@Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription).plugin(softDeletePlugin);
