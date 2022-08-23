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

	async findTripDayActivity(id: string) {
		console.log('findTripDayActivity() ');
		return await this.prisma.tripDayActivity.findFirst({
			where: {
				id: id,
			},
			include: {
				accommodation: {
					include: {
						accommodationPair: true,
					},
				},
			},
		});
	}

	async deleteActivity(dto: DeleteDto) {
		try {
			console.log('deleteActivity()');
			const response = [];
			const eventToDelete = await this.findTripDayActivity(dto.id);

			if (eventToDelete?.accommodation) {
				console.log('event to delete is accommodation');
				const deletePair = await this.findTripDayActivity(
					eventToDelete.accommodation.accommodationPair.tripDayActivityId
				);

				const deletedActivity = await this.deleteOneActivity(
					deletePair.accommodation.tripDayActivityId,
					deletePair.tripDayId,
					deletePair.order
				);
				response.push(deletedActivity);
			}

			const deleteEvent = await this.deleteOneActivity(
				dto.id,
				eventToDelete.tripDayId,
				eventToDelete.order
			);

			response.push(deleteEvent);

			return response;
		} catch (e) {
			console.log(e);
		}
	}

	async deleteOneActivity(id: string, tripDayId: string, order: number) {
		console.log('deleteOneActivity()');
		await this.updateActivitiesOnDelete(tripDayId, order);
		await this.deleteTripDayActivity(id);

		return await this.accommodationService.getFullDay(tripDayId);
	}

	async deleteTripDayActivity(id: string) {
		console.log('deleteTripDayActivity() ', id);
		await this.findTripDayActivity(id);

		await this.prisma.tripDayActivity.delete({
			where: {
				id: id,
			},
			include: {
				dayActivity: true,
				accommodation: true,
				travelEvent: true,
			},
		});
	}

	async updateActivitiesOnDelete(tripDayId: string, order: number) {
		console.log('updateActivitiesOnDelete()');

		await this.prisma.tripDayActivity.updateMany({
			where: {
				tripDayId: tripDayId,
				order: { gt: order },
			},
			data: {
				order: {
					decrement: 1,
				},
			},
		});
		return;
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
		await this.addActivity({
			tripDayId: dto.newTripDayId,
			activityId: dto.activityId,
			order: dto.newOrder,
			time: deleted[0].dayActivity?.time,
		});
		const response = [
			await this.accommodationService.getFullDay(dto.previousTripDayId),
			await this.accommodationService.getFullDay(dto.newTripDayId),
		];
		return response;
	}
}
