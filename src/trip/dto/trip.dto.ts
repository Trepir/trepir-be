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
	@IsString()
	@IsNotEmpty()
	location: LocationDto;
	accomodation?: {
		location: LocationDto;
		date: Date;
		state: string;
	}[];
	travelEvents?: {
		type: string;
		originId: LocationDto;
		destinationId: LocationDto;
		departure: Date;
		arrival: Date;
		tripId: number;
	}[];
}

export class LocationDto {
	@IsNotEmpty()
	@IsNumber()
	latitude: number;
	@IsNotEmpty()
	@IsNumber()
	longitude: number;
	@IsNotEmpty()
	@IsString()
	country: string;
	@IsNotEmpty()
	@IsString()
	state: string;
	@IsNotEmpty()
	@IsString()
	locationName: string;
	@IsNotEmpty()
	@IsString()
	city: string;

	@IsString()
	googleId: string | null;
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
