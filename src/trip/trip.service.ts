import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TripDto } from './dto';
@Injectable()
export class TripService {
	constructor(private prisma: PrismaService) {}
	async create(tripDto: TripDto) {
		const currentUser = await this.prisma.user.findUnique({
			where: {
				uid: tripDto.uid,
			},
		});
		// const trip = await this.prisma.trip.create({
		// 	data: {
		// 		userId: tripDto.uid,
		// 		startDate: tripDto.startDate,
		// 		endDate: tripDto.endDate,
		// 		name: tripDto.name,
		// 	},
		// });
	}
}
