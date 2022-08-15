import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UserDto } from './dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post('signup')
	signup(@Body() userDto: UserDto) {
		//dto:data transfer object
		console.log(userDto.uid);
		return this.authService.signup(userDto);
	}

	@Get('signin')
	signin(@Body() userDto: UserDto) {
		return this.authService.signin(userDto);
	}
}
