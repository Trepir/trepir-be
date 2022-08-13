import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService extends PrismaClient {
	constructor() {
		super({
			datasources: {
				db: {
					url: 'postgres://postgres:123@localhost:5432/nest',
				},
			},
		});
	}
}
