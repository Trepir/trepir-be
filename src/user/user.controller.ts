import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto, SinginDto, UserDto } from './dto';

@Controller('user')
export class AuthController {
	constructor(private authService: UserService) {}
	@Post('signup')
	signup(@Body() userDto: UserDto) {
		//dto:data transfer object
		console.log(userDto.uid);
		return this.authService.signup(userDto);
	}

	@Post('signin')
	signin(@Body() dto: SinginDto) {
		return this.authService.signin(dto);
	}
}
