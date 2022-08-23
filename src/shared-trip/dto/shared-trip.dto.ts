import { IsNotEmpty, IsString } from 'class-validator';

export class ShareTripDto {
	@IsString()
	@IsNotEmpty()
	tripId: string;

	@IsString()
	@IsNotEmpty()
	email: string;
}

export class DeleteShareDto {
	@IsString()
	id: string;
}
