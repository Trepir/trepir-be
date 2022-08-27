import { Injectable, BadRequestException } from '@nestjs/common';
import { throws } from 'assert';
import { PrismaService } from 'src/prisma/prisma.service';
import { favouriteActivityDto, tripIdDto } from 'src/trip/dto';
import {
	ActivityDto,
	FavoriteActivityDto,
	ActivityByCoordinatesDto,
	LinkFavoriteActivityDto,
} from './dto';

@Injectable()
export class ActivityService {
	constructor(private prisma: PrismaService) {}

	async create(dto: ActivityDto) {
		const currentUser = await this.prisma.user.findUniqueOrThrow({
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
							where: { googleId: dto.location.googleId },

							create: {
								...dto.location,
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

			delete activity.creatorId;

			return activity;
		} catch (e) {
			if (e == 'NotFoundError: No User found') {
				throw new BadRequestException('incorrect user');
			}
			throw new BadRequestException('Activity not deleted');
		}
	}

	async all() {
		const activities = await this.prisma.activity.findMany({
			include: { location: true },
		});
		return activities;
	}
	async coordinates(dto: ActivityByCoordinatesDto) {
		try {
			const activitiesInCoordinates = await this.prisma.activity.findMany({
				where: {
					location: {
						longitude: {
							lte: dto.longitudeHigh,
							gte: dto.longitudeLow,
						},
						latitude: {
							lte: dto.latitudeHigh,
							gte: dto.latitudeLow,
						},
					},
				},
				include: {
					location: true,
				},
			});
			return activitiesInCoordinates;
		} catch (e) {
			throw new BadRequestException('Coordinates incorrect');
		}
	}

	async favorite(dto: FavoriteActivityDto) {
		try {
			//connecting uid from front end to firebase id
			const currentUser = await this.prisma.user.findUnique({
				where: {
					uid: dto.uid,
				},
			});

			const unfavorite = await this.prisma.favoriteActivity.findFirst({
				where: {
					userId: currentUser.id,
					activityId: dto.activityId,
				},
			});
			if (unfavorite) {
				await this.prisma.favoriteActivity.deleteMany({
					where: {
						userId: currentUser.id,
						activityId: dto.activityId,
					},
				});
				// console.log('unfavorite():  ', unfavorite);
				return unfavorite;
			} else {
				const favoriteActivity = await this.prisma.favoriteActivity.create({
					data: {
						user: {
							connect: {
								//connect userid to dto id
								id: currentUser.id,
							},
						},
						activity: {
							connect: {
								//connect activity schema Id to dto id
								id: dto.activityId,
							},
						},
						trip: dto.tripId
							? {
									connect: {
										//connect trip schema Id to dto id
										id: dto.tripId,
									},
							  }
							: {},
					},
				});
				// console.log('favorite():  ', favoriteActivity);

				return favoriteActivity;
			}
		} catch (e) {
			if (e == 'NotFoundError: No User found') {
				throw new BadRequestException('incorrect user');
			}
			throw new BadRequestException('Activity not favorited');
		}
	}
	//get
	async favoriteActivities(dto: FavoriteActivityDto) {
		try {
			const currentUser = await this.prisma.user.findUniqueOrThrow({
				where: {
					uid: dto.uid,
				},
			});
			const favoriteActivities = await this.prisma.favoriteActivity.findMany({
				where: {
					userId: currentUser.id,
				},
				include: {
					activity: {
						include: {
							location: true,
						},
					},
				},
			});
			// console.log('getFavorites():  ', favoriteActivities);

			return favoriteActivities;
		} catch (e) {
			if (e == 'NotFoundError: No User found') {
				throw new BadRequestException('incorrect user');
			}
			throw new BadRequestException('Activity not favorited');
		}
	}

	async linkFavoriteActivities(dto: LinkFavoriteActivityDto) {
		try {
			return await this.prisma.favoriteActivity.updateMany({
				where: {
					id: {
						in: dto.favoriteId,
					},
				},
				data: {
					tripId: dto.tripId,
				},
			});
		} catch (e) {
			console.error(e);
			if (e == 'NotFoundError: No User found') {
				throw new BadRequestException('incorrect user');
			}
			throw new BadRequestException('Activities not linked to trip');
		}
	}
}
