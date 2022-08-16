import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccomodationService {
	constructor(private prisma: PrismaService) {}

	async addAccomodation(dto) {
		// const newAccomodation = await this.prisma.acomodation.create();
	}
}
