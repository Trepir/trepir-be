import { IsString, IsNotEmpty, IsObject, IsDateString } from 'class-validator';
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
	@IsDateString()
	departure: Date;

	@IsString()
	@IsNotEmpty()
	tripId: string;
}
