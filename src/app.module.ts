import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';
import { ActivityModule } from './activity/activity.module';
import { ConfigModule } from '@nestjs/config';
import { TravelEventModule } from './travelEvent/travelEvent.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { EditTripService } from './edit-trip/edit-trip.service';
import { EditTripModule } from './edit-trip/edit-trip.module';
import { SharedTripModule } from './shared-trip/shared-trip.module';

@Module({
	imports: [
		UserModule,
		PrismaModule,
		ActivityModule,
		AuthModule,
		TripModule,
		ConfigModule.forRoot({ isGlobal: true }),
		EditTripModule,
		SharedTripModule,
	],
	providers: [EditTripService],
})
export class AppModule {}
