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
	order: number;
	tripDayId: string;
}
