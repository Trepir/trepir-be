import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddActivityDto } from './dto';

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
		await this.prisma.tripDayActivity.create({
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
		});
		return await this.prisma.tripDay.findUnique({
			where: {
				id: dto.tripDayId,
			},
			include: {
				tripDayActivities: {
					include: {
						accommodation: {
							include: {
								location: true,
							},
						},
						travelEvent: {
							include: {
								destinationLocation: true,
								originLocation: true,
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
		});
	}
}
