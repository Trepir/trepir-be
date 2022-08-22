import { Injectable } from '@nestjs/common';
import { AccommodationState } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccommodationDto } from './dto/accommodation.dto';

@Injectable()
export class AccommodationService {
	constructor(private prisma: PrismaService) {}
	//calculating number of days of the trip
	calcDayIndex(date: Date, tripStartDate: Date) {
		const millisecondsInDays = 1000 * 60 * 60 * 24;
		const days: number = Number(date) - Number(tripStartDate);
		const index: number = Math.floor(days / millisecondsInDays);
		console.log('CalcDayIndex(): Index: ', index);
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
			include: { tripDay: true },
		});

		//create accomodation for start date / checkin
		const checkIn = await this.createOneAccommodation(
			currentTrip.startDate,
			accommodationDto.startDate,
			'CheckIn',
			accommodationDto
		);
		console.log('addAccommodation: Check in called');

		accommodationDto.accommodationPairId = checkIn.id;
		//create accomodation for end date / checkout
		const checkOut = await this.createOneAccommodation(
			currentTrip.startDate,
			accommodationDto.endDate,
			'CheckOut',
			accommodationDto
		);

		console.log('addAccommodation: Check out called');
		console.log('Checkout', checkOut.accommodation.id);

		const link1 = await this.linkAccommodation(
			checkIn.accommodation.id,
			checkOut.accommodation.id
		);
		console.log('link 1 called', { link1 });
		const link2 = await this.linkAccommodation(
			checkOut.accommodation.id,
			checkIn.accommodation.id
		);

		console.log({ link2 });

		return [
			await this.getFullDay(checkIn.tripDayId),
			await this.getFullDay(checkOut.tripDayId),
		];
	}

	async linkAccommodation(checkInId: string, checkOutId: string) {
		console.log('Call linkAccommodation update()');
		return await this.prisma.accommodation.update({
			where: {
				id: checkInId,
			},
			data: {
				accommodationPair: {
					connect: {
						id: checkOutId,
					},
				},
			},
		});
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
		console.log('currentTripDay () =');

		return await this.prisma.tripDayActivity.create({
			data: {
				tripDay: {
					//connecting the trip id of the tripDay table (so id = day of the trip) with our new trip activity
					connect: {
						id: currentTripDay.id,
					},
				},
				order: currentTripDay.tripDayActivities.length,
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
			include: {
				accommodation: true,
			},
		});
		return await this.getFullDay(currentTripDay.id);

		//find the day that corresponds to our trip id and our desired specific day within that trip
	}

	async getFullDay(tripDayId: string) {
		return await this.prisma.tripDay.findUnique({
			where: { id: tripDayId },

			include: {
				tripDayActivities: {
					include: {
						accommodation: {
							include: {
								location: true,
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
						travelEvent: {
							include: {
								originLocation: true,
								destinationLocation: true,
							},
						},
					},
				},
			},
		});
	}
}

//update accommodation: check the state (check in or out)
//connect with the tripday activities table and update the day
