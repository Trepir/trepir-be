import { Injectable } from '@nestjs/common';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TravelEventService } from 'src/travelEvent/travelEvent.service';
import { TripDto, updateTripDto } from './dto';

@Injectable()
export class TripService {
	constructor(
		private prisma: PrismaService,
		private accommodationService: AccommodationService,
		private travelEventService: TravelEventService
	) {}
	tripLength = (endDate: Date, startDate: Date) => {
		const diffInMs: number =
			Number(new Date(endDate)) - Number(new Date(startDate));
		return diffInMs / (1000 * 60 * 60 * 24) + 1;
	};

	async create(tripDto: TripDto) {
		//creating an empty array with the length of the duration of the trip
		const dayArr: any[] = new Array(
			this.tripLength(tripDto.endDate, tripDto.startDate)
		);
		//connecting a user from the table  with the trip
		const currentUser = await this.prisma.user.findUnique({
			where: {
				uid: tripDto.uid,
			},
		});
		//crating the trip
		const trip = await this.prisma.trip.create({
			data: {
				user: {
					connect: {
						id: currentUser.id,
					},
				},
				startDate: tripDto.startDate,
				endDate: tripDto.endDate,
				name: tripDto.name,
				location: {
					connectOrCreate: {
						where: {
							googleId: tripDto.location.googleId,
						},
						create: {
							...tripDto.location,
						},
					},
				},
				tripDay: {
					create: dayArr.map((_, i) => {
						return {
							dayIndex: i,
						};
					}),
				},
			},
		});
		// if there is accommodiation
		tripDto.accommodation.length &&
			tripDto.accommodation.forEach((ac) =>
				this.accommodationService.addAccommodation({
					...ac,
					tripId: trip.id,
					uid: tripDto.uid,
				})
			);
		// if there is travel events
		tripDto.travelEvents.length &&
			tripDto.travelEvents.forEach((event) =>
				this.travelEventService.addTravelEvent({
					...event,
					tripId: trip.id,
				})
			);
		return trip;
	}
}

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

// const trip = await this.prisma.trip.create({
// 	data: {
// 		userId: tripDto.uid,
// 		startDate: tripDto.startDate,
// 		endDate: tripDto.endDate,
// 		name: tripDto.name,
// 		// location: tripDto.location,
// 		tripDay: {
// 			create: dayArr.map((day,i)=>{
// 				return {
// 					dayIndex:i,
// 				}
// 			})

// 			}
// 		}
// 	},
// };

// async update(tripDto: updateTripDto) {
// 	const currentUser = await this.prisma.user.findUnique({
// 		where: {
// 			uid: tripDto.uid,
// 		},
// 	});
// 	const newTripDay = async () => {
// 		for (let i = 0; i < this.tripLength; i++) {
// 			//create an entry for each day
// 			const day = await this.prisma.tripDay.create({
// 				data: {
// 					dayIndex: i,
// 				},
// 			});
// 		}
// 	};
// }
// }
