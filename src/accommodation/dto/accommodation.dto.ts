import { IsNotEmpty, IsString, IsObject, IsDateString } from 'class-validator';
import { LocationDto } from 'src/activity/dto';
import { AccommodationState } from '@prisma/client';

export class AccommodationDto {
	@IsString()
	@IsNotEmpty()
	uid: string;

	@IsString()
	@IsNotEmpty()
	tripId: string;

	@IsNotEmpty()
	@IsDateString()
	startDate: Date;

	@IsNotEmpty()
	@IsDateString()
	endDate: Date;

	@IsNotEmpty()
	@IsObject()
	location: LocationDto;
}

export class AccommodationEvent {
	tripId: string;
	date: Date;
	location: LocationDto;
	state: AccommodationState;
	tripDayActivityId: string;
	order: number;
}
