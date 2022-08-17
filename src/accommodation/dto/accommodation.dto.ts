import { IsNotEmpty, IsString, IsDate, IsObject } from 'class-validator';
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
	@IsDate()
	startDate: Date;

	@IsNotEmpty()
	@IsDate()
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
