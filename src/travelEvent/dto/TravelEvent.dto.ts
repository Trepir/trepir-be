import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { TravelType } from '@prisma/client';
export class TravelEventDto {
	@IsNotEmpty()
	travelType: TravelType;
	@IsNotEmpty()
	originId: LocationDto;
	@IsNotEmpty()
	destinationId: LocationDto;
	@IsNotEmpty()
	@IsDate()
	departure: Date;
	@IsNotEmpty()
	@IsDate()
	arrival: Date;
	@IsNumber()
	@IsNotEmpty()
	tripId: number;
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

export class TravelTypeDto {
	flight: string;
	bus: string;
	boat: string;
	car: string;
	train: string;
}
