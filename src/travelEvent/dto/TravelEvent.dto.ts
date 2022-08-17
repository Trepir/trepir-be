import { IsString, IsNotEmpty, IsDate, IsObject } from 'class-validator';
import { TravelType } from '@prisma/client';
import { LocationDto } from 'src/activity/dto';

export class TravelEventDto {
	@IsNotEmpty()
	travelType: TravelType;

	@IsNotEmpty()
	@IsObject()
	origin: LocationDto;

	@IsNotEmpty()
	@IsObject()
	destination: LocationDto;

	@IsNotEmpty()
	@IsDate()
	departure: Date;

	@IsString()
	@IsNotEmpty()
	tripId: string;
}

export class TravelTypeDto {
	flight: string;
	bus: string;
	boat: string;
	car: string;
	train: string;
}
