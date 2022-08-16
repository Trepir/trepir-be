import { Injectable } from '@nestjs/common';
import { AccommodationState } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccommodationDto, AccommodationEvent } from './dto/accommodation.dto';

@Injectable()
export class AccommodationService {
	constructor(private prisma: PrismaService) {}

	calcDayIndex(date: Date, tripStartDate: Date) {
		const days: number =
			Number(new Date(date)) - Number(new Date(tripStartDate));
		const index: number = days / (1000 * 60 * 60 * 24);
		return index;
	}

	async addAccommodation(accommodationDto: AccommodationDto) {
		const currentTrip = await this.prisma.trip.findUnique({
			where: {
				id: accommodationDto.tripId,
			},
		});

		this.createOneAccommodation(
			currentTrip.startDate,
			accommodationDto.startDate,
			'CheckIn',
			accommodationDto
		);
		this.createOneAccommodation(
			currentTrip.startDate,
			accommodationDto.endDate,
			'CheckOut',
			accommodationDto
		);
	}

	async getCurrentTripDay(
		tripStartDate: Date,
		accommodationDate: Date,
		tripId: string
	) {
		return await this.prisma.tripDay.findFirst({
			where: {
				tripId: tripId,
				dayIndex: this.calcDayIndex(accommodationDate, tripStartDate),
			},
			include: { tripDayActivities: true },
		});
	}

	async createOneAccommodation(
		tripStartDate: Date,
		accommodationDate: Date,
		state: string,
		dto: AccommodationDto
	) {
		const currentTripDay = await this.getCurrentTripDay(
			tripStartDate,
			accommodationDate,
			dto.tripId
		);
		const newAccommodation = await this.prisma.tripDayActivity.create({
			data: {
				tripDay: {
					connect: {
						id: currentTripDay.id,
					},
				},
				order: currentTripDay.tripDayActivities.length + 1,
				accommodation: {
					create: {
						date: accommodationDate,
						state: state as AccommodationState,
						location: {
							connectOrCreate: {
								where: { googleId: dto.location.googleId },

								create: {
									...dto.location,
								},
							},
						},
					},
				},
			},
		});
		return newAccommodation;
	}
}
