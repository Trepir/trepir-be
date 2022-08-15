import {
	IsNotEmpty,
	IsString,
	IsDate,
	IsArray,
	IsNumber,
} from 'class-validator';

export class TripDto {
	@IsString()
	@IsNotEmpty()
	uid: string;
	@IsNotEmpty()
	@IsDate()
	startDate: Date;
	@IsNotEmpty()
	@IsDate()
	endDate: Date;
	@IsString()
	@IsNotEmpty()
	name: string;
	@IsNumber()
	@IsNotEmpty()
	longitude: number;
	@IsNumber()
	@IsNotEmpty()
	latitude: number;
	@IsString()
	@IsNotEmpty()
	place_Id: string;
}

export class updateTripDto {
	@IsNotEmpty()
	@IsDate()
	startDate: Date;
	@IsNotEmpty()
	@IsDate()
	endDate: Date;
	@IsNotEmpty()
	@IsString()
	id: string;
	@IsString()
	@IsNotEmpty()
	uid: string;
	@IsArray()
	days?: {
		dayIndex: number;
		dayActivities?: {
			activityId: string;
			eventType: string;
		}[];
	}[];
}
