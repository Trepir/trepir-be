import { Injectable, ForbiddenException } from '@nestjs/common';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TravelEventService } from 'src/travelEvent/travelEvent.service';
import { TripDto, UpdateTripDto } from './dto';

@Injectable()
export class TripService {
	constructor(
		private prisma: PrismaService,
		private accommodationService: AccommodationService,
		private travelEventService: TravelEventService
	) {}
	tripLength = (endDate: Date, startDate: Date) => {
		const millisecondsInDays = 1000 * 60 * 60 * 24;
		const diffInMs: number = Number(endDate) - Number(startDate);
		return Math.floor(diffInMs / millisecondsInDays) + 1;
	};

	async create(tripDto: TripDto) {
		//creating an empty array with the length of the duration of the trip

		tripDto.startDate = new Date(tripDto.startDate);
		tripDto.endDate = new Date(tripDto.endDate);
		const tripLength = this.tripLength(tripDto.endDate, tripDto.startDate);
		const dayArr: any[] = new Array(tripLength)
			.fill('', 0, tripLength)
			.map((e, i) => {
				return { dayIndex: i };
			});

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
				googlePlaceId: tripDto.googlePlaceId,
				latitude: tripDto.latitude,
				longitude: tripDto.longitude,
				photoUrl: tripDto.photoUrl,
				formattedAddress: tripDto.formattedAddress,
				googleLocationName: tripDto.googleLocationName,

				tripDay: {
					createMany: {
						data: dayArr,
					},
				},
			},
		});

		// if there is accommodiation
		tripDto.accommodation?.length &&
			tripDto.accommodation.forEach((ac) => {
				console.log('Call add Accomodation service');
				return this.accommodationService.addAccommodation({
					...ac,
					tripId: trip.id,
					uid: tripDto.uid,
				});
			});
		// if there is travel events
		tripDto.travelEvents?.length &&
			tripDto.travelEvents.forEach((event) =>
				this.travelEventService.addTravelEvent({
					...event,
					tripId: trip.id,
				})
			);
		return await this.prisma.trip.findUnique({
			where: {
				id: trip.id,
			},
			include: {
				tripDay: true,
				participants: true,
			},
		});
	}

	async tripById(id: string) {
		const trip = await this.prisma.trip.findUnique({
			where: {
				id: id,
			},
			include: {
				tripDay: {
					orderBy: {
						dayIndex: 'asc',
					},
					include: {
						tripDayActivities: {
							orderBy: {
								order: 'asc',
							},
							include: {
								accommodation: {
									include: { location: true },
								},
								travelEvent: {
									include: {
										originLocation: true,
										destinationLocation: true,
									},
								},
								dayActivity: {
									include: {
										activity: {
											include: {
												location: true,
											},
										},
									},
								},
							},
						},
					},
				},
				favouriteActivities: {
					include: {
						activity: {
							include: {
								location: true,
							},
						},
					},
				},
			},
		});
		if (!trip) throw new ForbiddenException('incorrect Id');
		return trip;
	}
	async updateTrip(dto: UpdateTripDto) {
		dto.startDate = new Date(dto.startDate);
		dto.endDate = new Date(dto.endDate);
		const updatedTrip = await this.prisma.trip.update({
			where: { id: dto.id },
			data: dto,
		});
		return updatedTrip;
	}
}
