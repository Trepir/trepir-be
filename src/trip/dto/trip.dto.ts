import { TravelType } from '@prisma/client';
import {
	IsNotEmpty,
	IsString,
	IsDate,
	IsArray,
	IsNumber,
} from 'class-validator';

import { LocationDto } from 'src/activity/dto';

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
	@IsString()
	@IsNotEmpty()
	location: LocationDto;
	accommodation?: {
		location: LocationDto;
		startDate: Date;
		endDate: Date;
		tripId?: string;
	}[];
	travelEvents?: {
		travelType: TravelType;
		origin: LocationDto;
		destination: LocationDto;
		departure: Date;
		arrival: Date;
		tripId?: string;
	}[];
}

export class favouriteActivityDto {
	activityId: string[];
}

export class updateTripDto {
	@IsNotEmpty()
	@IsString()
	id: string;
	@IsString()
	@IsNotEmpty()
	uid: string;
	@IsArray()
	tripDays?: {
		dayIndex: number;
		dayActivities?: {
			activityId: string;
			eventType: string;
			order: number;
		}[];
	}[];
}
