import { TravelType } from '@prisma/client';
import {
	IsNotEmpty,
	IsString,
	IsDate,
	IsArray,
	IsNumber,
	IsObject,
	IsOptional,
	IsDateString,
} from 'class-validator';

import { LocationDto } from 'src/activity/dto';

export class TripDto {
	@IsString()
	@IsNotEmpty()
	uid: string;

	@IsNotEmpty()
	@IsDateString()
	startDate: Date;

	@IsNotEmpty()
	@IsDateString()
	endDate: Date;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	@IsObject()
	location: LocationDto;

	@IsOptional()
	@IsArray()
	accommodation?: {
		location: LocationDto;
		startDate: Date;
		endDate: Date;
		tripId?: string;
	}[];

	@IsOptional()
	@IsArray()
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

export class tripIdDto {
	@IsNotEmpty()
	@IsString()
	tripId: string;
}
