import { Injectable } from '@nestjs/common';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TravelEventDto } from './dto';

@Injectable()
export class TravelEventService {
	constructor(
		private prisma: PrismaService,
		private accommodationService: AccommodationService
	) {}
	async addTravelEvent(travelEventDto: TravelEventDto) {
		const currentTrip = await this.prisma.trip.findUnique({
			where: {
				id: travelEventDto.tripId,
			},
		});

		const currentTripDay = await this.accommodationService.getCurrentTripDay(
			currentTrip.startDate,
			travelEventDto.departure,
			travelEventDto.tripId
		);

		const newTravelEvent = await this.prisma.tripDayActivity.create({
			data: {
				tripDay: {
					connect: {
						id: currentTripDay.id,
					},
				},
				order: currentTripDay.tripDayActivities.length + 1,
				travelEvent: {
					create: {
						originLocation: {
							connectOrCreate: {
								where: { googleId: travelEventDto.origin.googleId },

								create: {
									...travelEventDto.origin,
								},
							},
						},
						type: travelEventDto.travelType,
						destinationLocation: {
							connectOrCreate: {
								where: { googleId: travelEventDto.destination.googleId },
								create: {
									...travelEventDto.destination,
								},
							},
						},
						departure: travelEventDto.departure,
					},
				},
			},
		});
		return newTravelEvent;
	}
}
