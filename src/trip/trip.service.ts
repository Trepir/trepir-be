import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TripDto } from './dto';
@Injectable()
export class TripService {
	constructor(private prisma: PrismaService) {}
	async create(tripDto: TripDto) {
		const trip = await this.prisma.trip.create({
			data: {},
		});
	}
}
