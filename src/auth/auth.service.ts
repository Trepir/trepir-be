import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}
	async signup(userDto: UserDto) {
		const user = await this.prisma.user.create({
			data: {
				email: userDto.email,
				uid: userDto.uid,
				firstName: userDto.firstName,
				lastName: userDto.lastName,
				displayName: userDto.displayName,
				photoUrl: userDto.photoUrl,
			},
		});
	}
	async signin(userDto: UserDto) {
		const user = await this.prisma.user.findFirst({
			where: {
				uid: userDto.uid,
			},
		});
		if (!user) throw new ForbiddenException('Credentials incorrect');
		//verify password??
		return user;
	}
}
