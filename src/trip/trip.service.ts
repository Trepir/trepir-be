import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TripDto, updateTripDto } from './dto';

@Injectable()
export class TripService {
	constructor(private prisma: PrismaService) {}
	// async create(tripDto: TripDto) {
	// 	// const currentUser = await this.prisma.user.findUnique({
	// 	// 	where: {
	// 	// 		uid: tripDto.uid,
	// 	// 	},
	// 	// });
	// 	const trip = await this.prisma.trip.create({
	// 		data: {
	// 			userId: tripDto.uid,
	// 			startDate: tripDto.startDate,
	// 			endDate: tripDto.endDate,
	// 			name: tripDto.name,
	// 			latitude: tripDto.latitude,
	// 			longitude: tripDto.longitude,
	// 			place_Id: tripDto.place_Id,
	// 		},
	// 	});
	// }
	// async update(tripDto: updateTripDto) {
	// 	const currentUser = await this.prisma.user.findUnique({
	// 		where: {
	// 			id: tripDto.id,
	// 		},
	// 	});
	// 	const newTripDay = async () => {
	// 		for (let i = tripDto.startDate; i < tripDto.endDate; i++) {
	// 			//create an entry for each day
	// 			const day = await this.prisma.tripDay.create({
	// 				data: {
	// 					dayIndex: i,
	// 				},
	// 			});
	// 		}
	// 	};
	// }
}
