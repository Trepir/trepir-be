import { Tag } from '@prisma/client';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

	time?: Date;
	rating?: number;

	@IsNotEmpty()
	@IsString()
	uid: string;

	// Tags

	@IsArray()
	tags?: Tag[];

	//
	location: LocationDto;
}

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

	@IsString()
	googleId: string | null;
}
