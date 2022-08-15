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

	// Location

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
	city: string;

	@IsNotEmpty()
	@IsString()
	locationName: string;

	@IsString()
	googleId?: string;

	// Tags

	@IsArray()
	tags?: Tag[];

	//
}
