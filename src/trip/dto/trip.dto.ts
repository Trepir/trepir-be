import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class TripDto {
	@IsString()
	@IsNotEmpty()
	uid: string;
	@IsNotEmpty()
	@IsDate()
	startDate: Date;
	@IsNotEmpty()
	@IsNotEmpty()
	@IsDate()
	endDate: Date;
	@IsString()
	@IsNotEmpty()
	name: string;
}
