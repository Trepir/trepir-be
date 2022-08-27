import {
	IsString,
	IsNotEmpty,
	IsObject,
	IsDateString,
	IsOptional,
	IsNumber,
} from 'class-validator';
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

	@IsOptional()
	@IsString()
	info?: string;
}

export class UpdateTravelEventDto {
	@IsOptional()
	travelType?: TravelType;

	@IsOptional()
	@IsObject()
	origin?: LocationDto;

	@IsOptional()
	@IsObject()
	destination?: LocationDto;

	@IsOptional()
	@IsDateString()
	departure?: Date;

	@IsOptional()
	@IsString()
	info?: string;

	@IsNotEmpty()
	@IsString()
	travelEventId?: string;

	@IsOptional()
	@IsNumber()
	order?: number;

	@IsOptional()
	@IsString()
	tripId?: string;
}
