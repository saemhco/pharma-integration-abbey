import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, now, Types, SchemaTypes } from "mongoose";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";

export type PharmacyDocument = Pharmacy & Document;
@Schema()
export class Pharmacy {
    @Prop({ type: String, default: '' })
    fname: string;

    @Prop({ type: String, default: '' })
    lname: string;

    @Prop({ type: String, default: '' })
    fullname: string;

    @Prop({
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    })
    email: string;

    @Prop({ type: String, default: '' })
    password: string;

    @Prop({ type: String, default: '' })
    profile_img: string;

    @Prop({ type: String, default: '' })
    pharmacy_name: string;

    @Prop({ type: Number, default: 0 })
    total_jobs: number;

    @Prop({ type: Number, default: 0 })
    active_jobs: number;

    @Prop({ type: Number, default: 0 })
    completed_jobs: number;

    @Prop({ type: Number, default: 0 })
    avg_revenue: number;

    @Prop({ type: Number, default: 0 })
    total_expense: number;

    @Prop({ type: Number, default: 0 })
    available_cabs: number;

    @Prop({ type: String, default: '' })
    token: string;

    @Prop({ type: String, default: 'n' })
    socialType: string; // n for normal login,f for facebook login,g for google login
    
    @Prop({ type: String, default: '' })
    socialId: string;

    @Prop({ type: String, default: '' })
    mobile_no: string;

    @Prop({ type: String, default: '' })
    country_code: string;

    @Prop({ type: Number, default: 0 })
    rating_pharmacy: number;

    @Prop({ type: Boolean, default: true })
    active: boolean;

    @Prop({ type: Boolean, default: false })
    isVerified: boolean;

    @Prop({ type: Boolean, default: false })
    delete: boolean;

    @Prop({type: Date, default: now})
    createdAt: Date;

    @Prop({ type: String, default: '' })
    location: string;

    @Prop({
        type: [Number],
        index: '2dsphere'
    })
    lat_long: [number];

    @Prop({ type: String, default: '' })
    stripe_customerId: string;

    @Prop({ type: Boolean, default: false })
    isOnline: boolean;

    @Prop({ type: String, default: '' })
    selected_card: string;

    @Prop({type: Object })
    country: SiteNameInterface;
    
    @Prop({type: Object })
    region: SiteNameInterface;

    @Prop({type: Object})
    state: SiteNameInterface;
    
    @Prop({type: Object})
    city: SiteNameInterface;
    
    @Prop({ type: String, default: '' })
    postcode: string;
    
    @Prop({ type: String, default: '' })
    country_name_code: string;
    
    @Prop()
    my_jobs: [];

    @Prop({ type: Number, default: 0 })
    job_count: number;
    
    @Prop({ type: Number, default: 0 })
    pickup_count: number;
    
    @Prop({ type: Number, default: 0 })
    delivery_count: number;
    
    @Prop({
        type: String,
        unique: true,
    })
    pharmacy_code: string;

    @Prop()
    last_paid_on: Date;

    @Prop()
    last_requested_payment: Date;

    @Prop({ type: Boolean, default: false })
    payment_request: boolean;
    
    @Prop({ type: Number, default: 0 })
    amount_payable: number;
    
    @Prop({ type: Boolean, default: false })
    accepted_job: boolean;
    
    @Prop()
    upcoming_jobs: [];
    
    @Prop({ type: String, default: '' })
    timeZone: string;
    
    @Prop({ type: Boolean, default: false })
    payment_due: boolean;
    
    @Prop({ type: Number, default: 0 })
    accepted_pending_counts: number;
    
    @Prop({ type: String, default: 'en' })
    language: string;
    
    @Prop({ type: Boolean, default: false })
    isSubscription: boolean;
    
    @Prop({ type: Number, default: 0 })
    available_job: number;
    
    @Prop({ type: Boolean, default: false })
    email_verified: boolean;
    
    @Prop({ type: Boolean, default: false })
    mobile_verified: boolean;
    
    @Prop({ type: String, default: '' })
    otp_mobile: string;
    
    @Prop({ type: String, default: '' })
    otp_email: string;
    
    @Prop({ type: Boolean, default: false })
    cookie_status: boolean;
    
    @Prop({ type: String, default: '' })
    country_flag_name: string;
    
    @Prop({ type: String, default: '' })
    pharmacy_landline_num: string;
    
    @Prop()
    preffered_drivers: []; // drivers which are selected at last job
    
    @Prop()
    devices: [{
        'device_type': { type: String, default: 'W' },
        'device_token': { type: String, default: '' }
    }];

    @Prop({ type: String, default: '' })
    adminLoginToken: string;

    @Prop({ type: Date, default: null }) //ADD NEW KEY
    privacy_policy_accept_date: Date; // policy accepted by pharmacy or not
    
    @Prop()
    assignedDrivers: []; //ASSIGN DRIVER UNDER PHARMACY

    @Prop({ type: Boolean, default: false })
    isSubscribedByDispatch: boolean;
    
    @Prop({ type: SchemaTypes.ObjectId, default: null })
    dispatchCompanyId: Types.ObjectId;

    @Prop()
    selectedAssignedDrivers: []; // dispatch drivers default selected by pharmacy

    @Prop({type: Object})
    credentials_for_dispatch: CredentialsInterface;

    @Prop()
    preffered_dispatches: [];

    @Prop({ type: Boolean, default: true })
    emailNotifications: boolean;

    @Prop({ type: Boolean, default: false })
    isPharmacyTypeOnline: boolean;

	// add new key
    @Prop({ type: String, default: '' })
    street_name: string;

    @Prop({ type: String, default: '' })
    phone_number: string;

    @Prop({ type: String, default: '' })
	fax_number: string;

    @Prop({ type: String, default: '' })
	fax_country_code: string;

    @Prop({ type: Boolean, default: false })
	is_integration: boolean;
}

interface SiteNameInterface {
    short_name: { type: String, default: '' }, 
    long_name: { type: String, default: '' }
}

interface CredentialsInterface { 
    secret_code: { type: String, default: '' }, 
    codeCreatedAt: Date 
}

export const PharmacySchema = SchemaFactory.createForClass(Pharmacy).plugin(softDeletePlugin);

