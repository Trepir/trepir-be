import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityDto } from './dto';

@Injectable()
export class ActivityService {
	constructor(private prisma: PrismaService) {}

	async create(dto: ActivityDto) {
		const currentUser = await this.prisma.user.findUnique({
			where: {
				uid: dto.uid,
			},
		});

		try {
			const activity = await this.prisma.activity.create({
				data: {
					name: dto.name,
					duration: dto.duration,
					description: dto.description,
					time: dto.time,
					rating: dto.rating,
					location: {
						connectOrCreate: {
							where: { googleId: dto.googleId },

							create: {
								latitude: dto.latitude,
								longitude: dto.longitude,
								googleId: dto.googleId,
								country: dto.country,
								state: dto.state,
								city: dto.city,
								locationName: dto.locationName,
							},
						},
					},
					tags: dto.tags,

					creator: {
						connect: {
							id: currentUser.id,
						},
					},
				},
			});

			delete activity.id;
			delete activity.creatorId;

			return activity;
		} catch (e) {
			console.log(e);
		}
	}

	async all() {
		const activities = await this.prisma.activity.findMany();
		return activities;
	}
}