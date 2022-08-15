import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
@Injectable()
export class UserService {
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
