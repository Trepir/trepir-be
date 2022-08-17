import { Injectable } from '@nestjs/common';
import { AccommodationState } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccommodationDto } from './dto/accommodation.dto';

@Injectable()
export class AccommodationService {
	constructor(private prisma: PrismaService) {}
	//calculating number of days of the trip
	calcDayIndex(date: Date, tripStartDate: Date) {
		const days: number = Number(date) - Number(tripStartDate);
		const index: number = days / (1000 * 60 * 60 * 24);
		return index;
	}

	async addAccommodation(accommodationDto: AccommodationDto) {
		accommodationDto.startDate = new Date(accommodationDto.startDate);
		accommodationDto.endDate = new Date(accommodationDto.endDate);
		//obtaining the trip where the accomodation corresponds to
		const currentTrip = await this.prisma.trip.findUnique({
			where: {
				id: accommodationDto.tripId,
			},
		});
		//create accomodation for start date / checkin
		this.createOneAccommodation(
			currentTrip.startDate,
			accommodationDto.startDate,
			'CheckIn',
			accommodationDto
		);
		//create accomodation for start date / checkout
		this.createOneAccommodation(
			currentTrip.startDate,
			accommodationDto.endDate,
			'CheckOut',
			accommodationDto
		);
	}

	//GET AN ENTRY ON TRIP DAY (list of all days of all trips with an activity array)
	async getCurrentTripDay(
		tripStartDate: Date,
		accommodationDate: Date,
		tripId: string
	) {
		//find the day that corresponds to our trip id and our desired specific day within that trip
		return await this.prisma.tripDay.findFirst({
			where: {
				tripId: tripId,
				//difference btwn the day of the accomodation and the day the trip beggins will tell you the day of the trip in which the accommodation is placed in
				dayIndex: this.calcDayIndex(accommodationDate, tripStartDate),
			},
			// include the day activities array in the return
			include: { tripDayActivities: true },
		});
	}

	//Function to create one accomodation and within it we are creating an entry to trpDayActivity as an accommodation activity
	async createOneAccommodation(
		tripStartDate: Date,
		accommodationDate: Date,
		state: string,
		dto: AccommodationDto
	) {
		//get trip day entry
		const currentTripDay = await this.getCurrentTripDay(
			tripStartDate,
			accommodationDate,
			dto.tripId
		);
		const newAccommodation = await this.prisma.tripDayActivity.create({
			data: {
				tripDay: {
					//connecting the trip id of the tripDay table (so id = day of the trip) with our new trip activity
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
