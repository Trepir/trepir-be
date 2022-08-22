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
	@IsOptional()
	@IsString()
	country?: string;
	@IsOptional()
	@IsString()
	state?: string;
	@IsNotEmpty()
	@IsString()
	locationName: string;
	@IsNotEmpty()
	@IsString()
	formattedAddress: string;
	@IsOptional()
	@IsString()
	city?: string;
	@IsArray()
	photoUrl: string[];

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
	@IsOptional()
	@IsString()
	activityId?: string;
	@IsNotEmpty()
	@IsString()
	uid: string;
	@IsOptional()
	@IsString()
	tripId?: string;
}

export class InitialFavoriteActivityDto {
	@IsNotEmpty()
	@IsArray()
	activityId?: string[];
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
