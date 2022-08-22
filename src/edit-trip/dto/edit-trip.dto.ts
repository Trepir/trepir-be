import { DayActivity } from '@prisma/client';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class AddActivityDto {
	@IsString()
	@IsNotEmpty()
	activityId: string;

	@IsString()
	@IsNotEmpty()
	tripDayId: string;

	@IsOptional()
	@IsNumber()
	time?: Date;

	@IsOptional()
	@IsNumber()
	order?: number;
}

export class DeleteDto {
	@IsString()
	id: string;
}

export class ReorderDto {
	@IsNotEmpty()
	@IsNumber()
	newOrder: number;
	@IsString()
	@IsNotEmpty()
	tripDayId: string;
	@IsString()
	@IsNotEmpty()
	tripDayActivityId: string;
}

export class ActivityDayChangeDto {
	@IsString()
	@IsNotEmpty()
	activityId: string;
	@IsNotEmpty()
	@IsNumber()
	newOrder: number;
	@IsString()
	@IsNotEmpty()
	newTripDayId: string;
	@IsString()
	@IsNotEmpty()
	previousTripDayId: string;
	@IsString()
	@IsNotEmpty()
	tripDayActivityId: string;
}
