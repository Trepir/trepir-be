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
}
