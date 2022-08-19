import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddActivityDto, DeleteDto } from './dto';

@Injectable()
export class EditTripService {
	constructor(private prisma: PrismaService) {}
	async addActivity(dto: AddActivityDto) {
		const currDay = await this.prisma.tripDay.findUnique({
			where: {
				id: dto.tripDayId,
			},
			include: {
				tripDayActivities: true,
			},
		});
		return await this.prisma.tripDayActivity.create({
			data: {
				tripDay: {
					connect: {
						id: dto.tripDayId,
					},
				},
				order: currDay.tripDayActivities.length,
				dayActivity: {
					create: {
						activity: {
							connect: {
								id: dto.activityId,
							},
						},
						time: dto.time ? new Date(dto.time) : null,
					},
				},
			},
			include: {
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
		});
	}

	async deleteActivity(dto: DeleteDto) {
		try {
			console.log('deleteActivity()');
			const eventToDelete = await this.prisma.tripDayActivity.findFirst({
				where: {
					id: dto.id,
				},
			});

			const updateMany = await this.prisma.tripDayActivity.updateMany({
				where: {
					tripDayId: eventToDelete.tripDayId,
					order: { gt: eventToDelete.order },
				},
				data: {
					order: {
						decrement: 1,
					},
				},
			});

			console.log('UpdateMany()  ', updateMany);

			const deleteEvent = await this.prisma.tripDayActivity.delete({
				where: {
					id: dto.id,
				},
			});

			return deleteEvent;
		} catch (e) {
			console.log(e);
		}
	}

	async findActivitiesToUpdate(
		tripDayId: string,
		currentOrder: number,
		newOrderPosition?: number
	) {
		const search = {};
		if (newOrderPosition) {
			newOrderPosition > currentOrder
				? (search['lt'] = currentOrder)
				: (search['gt'] = currentOrder);
		} else {
			search['gt'] = currentOrder;
		}

		return await this.prisma.tripDayActivity.findMany({
			where: {
				tripDayId: tripDayId,
				order: search,
			},
		});
	}

	// return await this.prisma.tripDay.findUnique({
	// 	where: {
	// 		id: dto.tripDayId,
	// 	},
	// 	include: {
	// 		tripDayActivities: {
	// 			include: {
	// 				accommodation: {
	// 					include: {
	// 						location: true,
	// 					},
	// 				},
	// 				travelEvent: {
	// 					include: {
	// 						destinationLocation: true,
	// 						originLocation: true,
	// 					},
	// 				},
	// 				dayActivity: {
	// 					include: {
	// 						activity: {
	// 							include: {
	// 								location: true,
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// });
}
