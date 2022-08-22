import { Injectable } from '@nestjs/common';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	ActivityDayChangeDto,
	AddActivityDto,
	DeleteDto,
	ReorderDto,
} from './dto';

@Injectable()
export class EditTripService {
	constructor(
		private prisma: PrismaService,
		private accommodationService: AccommodationService
	) {}
	async addActivity(dto: AddActivityDto) {
		const currDay = await this.prisma.tripDay.findUnique({
			where: {
				id: dto.tripDayId,
			},
			include: {
				tripDayActivities: true,
			},
		});
		const newActivity = await this.prisma.tripDayActivity.create({
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

		return !dto.order && dto.order !== 0
			? await this.accommodationService.getFullDay(currDay.id)
			: this.reorderDayActivity({
					tripDayActivityId: newActivity.id,
					newOrder: dto.order,
					tripDayId: dto.tripDayId,
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

			await this.prisma.tripDayActivity.updateMany({
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

			console.log('Delete reorder( -1)');

			const deleteEvent = await this.prisma.tripDayActivity.delete({
				where: {
					id: dto.id,
				},
				include: {
					dayActivity: true,
					accommodation: true,
					travelEvent: true,
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
			const condition = this.greaterOrLowerIndex(
				currentOrder,
				newOrderPosition
			);
			search[condition] = currentOrder;
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

	greaterOrLowerIndex(currentOrder: number, newOrderPosition: number) {
		return newOrderPosition > currentOrder ? 'lt' : 'gt';
	}

	async reorderDayActivity(dto: ReorderDto) {
		const currActivity = await this.prisma.tripDayActivity.findUniqueOrThrow({
			where: {
				id: dto.tripDayActivityId,
			},
		});

		const prismaCondition = this.greaterOrLowerIndex(
			currActivity.order,
			dto.newOrder
		);
		console.log('current Order', currActivity.order);
		console.log('New Order', dto.newOrder);

		if (prismaCondition === 'gt') {
			const update = await this.prisma.tripDayActivity.updateMany({
				where: {
					tripDayId: dto.tripDayId,
					order: { gte: dto.newOrder, lt: currActivity.order },
				},
				data: {
					order: {
						increment: 1,
					},
				},
			});
			console.log('Updated gt function called $$$$$$$$$$', update);
			await this.prisma.tripDayActivity.update({
				where: {
					id: dto.tripDayActivityId,
				},
				data: {
					order: dto.newOrder,
				},
			});
		} else {
			const update = await this.prisma.tripDayActivity.updateMany({
				where: {
					tripDayId: dto.tripDayId,
					order: { lte: dto.newOrder, gt: currActivity.order },
				},
				data: {
					order: {
						decrement: 1,
					},
				},
			});
			console.log('Updated lt function called $$$$$$$$$$', update);
			await this.prisma.tripDayActivity.update({
				where: {
					id: dto.tripDayActivityId,
				},
				data: {
					order: dto.newOrder,
				},
			});
		}
		return this.accommodationService.getFullDay(dto.tripDayId);
	}

	async activityChangeDay(dto: ActivityDayChangeDto) {
		const deleted = await this.deleteActivity({ id: dto.tripDayActivityId });
		this.addActivity({
			tripDayId: dto.newTripDayId,
			activityId: dto.activityId,
			order: dto.newOrder,
			time: deleted.dayActivity?.time,
		});
		const response = [
			await this.accommodationService.getFullDay(dto.previousTripDayId),
			await this.accommodationService.getFullDay(dto.newTripDayId),
		];
		return response;
	}
}
