import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
	@IsString()
	@IsNotEmpty()
	uid: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;
}
export class UserDto {
	@IsNotEmpty()
	@IsString()
	firstName: string;
	@IsNotEmpty()
	@IsString()
	lastName: string;
	@IsNotEmpty()
	@IsString()
	displayName: string;
	@IsEmail()
	@IsNotEmpty()
	email: string;
	@IsNotEmpty()
	@IsString()
	uid: string;
	@IsNotEmpty()
	@IsString()
	photoUrl: string;
}
