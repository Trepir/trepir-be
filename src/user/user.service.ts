import {
	ForbiddenException,
	Injectable,
	ImATeapotException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SinginDto, UserDto } from './dto';
@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	async signup(userDto: UserDto) {
		try {
			const user = await this.prisma.user.create({
				data: {
					email: userDto.email,
					uid: userDto.uid,
					firstName: userDto.firstName,
					lastName: userDto.lastName,
					displayName: userDto.displayName,
					photoUrl: userDto.photoUrl,
					emailVerified: userDto.emailVerified,
				},
			});
			delete user.uid;
			delete user.id;
			return user;
		} catch (e) {
			console.error(e);
			throw new ImATeapotException('User already exists');
		}
	}
	async signin(dto: SinginDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				uid: dto.uid,
			},
			include: {
				favoriteActivities: {
					include: {
						activity: {
							include: {
								location: true,
							},
						},
					},
				},
				sharedTrips: {
					include: {
						sharedTrip: true,
					},
				},
				trips: {
					include: {
						participants: true,
					},
				},
				activities: false,
			},
		});
		if (!user) throw new ForbiddenException('Credentials incorrect');
		//verify password??
		delete user.uid;
		delete user.id;
		return user;
	}
}
