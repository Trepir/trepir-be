import { IsNotEmpty, IsString, IsDate, IsArray } from 'class-validator';

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
}

export class updateTripDto {
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
