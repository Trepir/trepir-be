import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}
	async signup(userDto: UserDto) {
		const user = await this.prisma.user.create({
			data: userDto,
		});
		delete user.uid;
		delete user.id;
		return user;
	}
	async signin(userDto: UserDto) {
		const user = await this.prisma.user.findFirst({
			where: {
				uid: userDto.uid,
			},
		});
		if (!user) throw new ForbiddenException('Credentials incorrect');
		//verify password??
		delete user.uid;
		delete user.id;
		return user;
	}
}
