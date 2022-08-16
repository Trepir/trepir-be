import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationDto, TravelEventDto } from './dto';

@Injectable()
export class TravelEventService {
	// constructor(private prisma: PrismaService) {}
	// async create(travelEventDto: TravelEventDto & LocationDto) {
	// 	await this.prisma.travelEvent.create({
	// 		data: {
	// 			originLocation: {
	// 				connectOrCreate: {
	// 					where: { googleId: travelEventDto.googleId },
	// 					create: {
	// 						latitude: travelEventDto.latitude,
	// 						longitude: travelEventDto.longitude,
	// 						googleId: travelEventDto.googleId,
	// 						country: travelEventDto.country,
	// 						state: travelEventDto.state,
	// 						city: travelEventDto.city,
	// 						locationName: travelEventDto.locationName,
	// 					},
	// 				},
	// 			},
	// 			type: travelEventDto.travelType,
	// 			destinationLocation: {
	// 				connectOrCreate: {
	// 					where: { googleId: travelEventDto.googleId },
	// 					create: {
	// 						latitude: travelEventDto.latitude,
	// 						longitude: travelEventDto.longitude,
	// 						googleId: travelEventDto.googleId,
	// 						country: travelEventDto.country,
	// 						state: travelEventDto.state,
	// 						city: travelEventDto.city,
	// 						locationName: travelEventDto.locationName,
	// 					},
	// 				},
	// 			},
	// 			departure: travelEventDto.departure,
	// 		},
	// 	});
	// }
	// dayIndex = (departure: Date) => {
	// 	return Number(new Date(departure)) / (1000 * 60 * 60 * 24) + 1;
	// };
}
