import {
	IsNotEmpty,
	IsString,
	IsObject,
	IsDateString,
	IsOptional,
} from 'class-validator';
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

	@IsOptional()
	accommodationPairId?: string;
}

export class UpdateAccommodationDto {
	@IsString()
	@IsNotEmpty()
	tripDayActivityId: string;

	@IsNotEmpty()
	@IsString()
	state: string;

	@IsOptional()
	@IsDateString()
	startDate: Date;

	@IsNotEmpty()
	@IsOptional()
	endDate: Date;

	@IsOptional()
	@IsObject()
	location: LocationDto;
}
