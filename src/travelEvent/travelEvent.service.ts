import { Injectable } from '@nestjs/common';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TravelEventDto, UpdateTravelEventDto } from './dto';

@Injectable()
export class TravelEventService {
	constructor(
		private prisma: PrismaService,
		private accommodationService: AccommodationService
	) {}
	async addTravelEvent(travelEventDto: TravelEventDto) {
		travelEventDto.departure = new Date(travelEventDto.departure);

		//finding our trip by mathching the trip id with the coresponding trip table entry
		const currentTrip = await this.prisma.trip.findUnique({
			where: {
				id: travelEventDto.tripId,
			},
		});
		//GET AN ENTRY ON TripDay (list of all days of all trips with an activity array)
		//Inside you get the index of the day trip
		const currentTripDay = await this.accommodationService.getCurrentTripDay(
			currentTrip.startDate,
			travelEventDto.departure,
			travelEventDto.tripId
		);
		//CREATION OF A NEW TRIP ACTIVITY of travel event type and inside dynamycally creating the travel event activity
		await this.prisma.tripDayActivity.create({
			data: {
				tripDay: {
					connect: {
						id: currentTripDay.id,
					},
				},
				//the activities array length of the corrsponding day entry
				order: currentTripDay.tripDayActivities.length,
				travelEvent: {
					//creating the travel event
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
						info: travelEventDto.info,
					},
				},
			},
		});
		return await this.accommodationService.getFullDay(currentTripDay.id);
	}
	async updateTravelEvent(dto: UpdateTravelEventDto) {
		if (dto.departure) {
			await this.prisma.travelEvent.delete({
				where: {
					id: dto.travelEventId,
				},
			});
			const newEvent = await this.addTravelEvent({
				tripId: dto.tripId,
				departure: dto.departure,
				travelType: dto.travelType,
				origin: dto.origin,
				destination: dto.destination,
			});
			return newEvent;
		} else {
			const updatedTravelEvent = await this.prisma.travelEvent.update({
				where: {
					id: dto.travelEventId,
				},
				data: {
					destinationLocation: {
						connectOrCreate: {
							where: { googleId: dto.destination.googleId },

							create: {
								...dto.destination,
							},
						},
					},
					originLocation: {
						connectOrCreate: {
							where: { googleId: dto.origin.googleId },

							create: {
								...dto.origin,
							},
						},
					},
					info: dto.info,
					type: dto.travelType,
				},
			});
			return updatedTravelEvent;
		}
	}
	async updateTravelEvent(dto: UpdateTravelEventDto) {
		if (dto.departure) {
			await this.prisma.travelEvent.delete({
				where: {
					id: dto.travelEventId,
				},
			});
			const newEvent = await this.addTravelEvent({
				tripId: dto.tripId,
				departure: dto.departure,
				travelType: dto.travelType,
				origin: dto.origin,
				destination: dto.destination,
			});
			return newEvent;
		} else {
			const updatedTravelEvent = await this.prisma.travelEvent.update({
				where: {
					id: dto.travelEventId,
				},
				data: {
					destinationLocation: {
						connectOrCreate: {
							where: { googleId: dto.destination.googleId },

							create: {
								...dto.destination,
							},
						},
					},
					originLocation: {
						connectOrCreate: {
							where: { googleId: dto.origin.googleId },

							create: {
								...dto.origin,
							},
						},
					},
					info: dto.info,
					type: dto.travelType,
				},
			});
			return updatedTravelEvent;
		}
	}
}
