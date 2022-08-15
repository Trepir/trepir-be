import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';
import { ActivityModule } from './activity/activity.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		UserModule,
		PrismaModule,
		ActivityModule,
		AuthModule,
		TripModule,
		ConfigModule.forRoot({ isGlobal: true }),
	],
})
export class AppModule {}
