import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteShareDto, ShareTripDto } from './dto';

@Injectable()
export class SharedTripService {
	constructor(private prisma: PrismaService) {}

	async share(dto: ShareTripDto) {
		try {
			return await this.prisma.sharedTrips.create({
				data: {
					participant: {
						connect: {
							email: dto.email,
						},
					},
					sharedTrip: {
						connect: {
							id: dto.tripId,
						},
					},
				},
			});
		} catch (e) {
			if (e.meta.cause.includes("No 'Trip' record(s)")) {
				throw new BadRequestException('Invalid trip id');
			}
			if (e.code == 'P2025') {
				throw new BadRequestException('Invalid email');
			}

			console.error('Internal Error', e);
			throw new InternalServerErrorException();
		}
	}

	async unshareTrip(dto: DeleteShareDto) {
		try {
			return await this.prisma.sharedTrips.delete({
				where: { id: dto.id },
			});
		} catch (e) {
			if (e.code === 'P2025') {
				throw new BadRequestException('Invalid id');
			}
			throw new InternalServerErrorException();
		}
	}
}
