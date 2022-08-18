import { Tag } from '@prisma/client';

import {
	IsArray,
	IsDate,
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
} from 'class-validator';

export class LocationDto {
	@IsNumber()
	@IsNotEmpty()
	latitude: number;
	@IsNumber()
	@IsNotEmpty()
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

	@IsOptional()
	@IsString()
	googleId?: string;
}

export class ActivityDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	duration: number;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsOptional()
	@IsDate()
	time?: Date;

	@IsOptional()
	@IsNumber()
	rating?: number;

	@IsNotEmpty()
	@IsString()
	uid: string;

	@IsNotEmpty()
	@IsString()
	imageUrl: string;

	// Tags

	@IsOptional()
	@IsArray()
	tags?: Tag[];

	//
	@IsNotEmpty()
	@IsObject()
	location: LocationDto;
}

export class FavoriteActivityDto {
	@IsNotEmpty()
	@IsString()
	activityId: string;
	@IsNotEmpty()
	@IsString()
	uid: string;
	@IsOptional()
	@IsString()
	tripId?: string;
}

export class ActivityByCoordinatesDto {
	@IsNumber()
	@IsNotEmpty()
	latitudeLow: number;
	@IsNumber()
	@IsNotEmpty()
	latitudeHigh: number;
	@IsNumber()
	@IsNotEmpty()
	longitudeLow: number;
	@IsNumber()
	@IsNotEmpty()
	longitudeHigh: number;
}
