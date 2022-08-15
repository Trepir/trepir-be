import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';

@Module({
	imports: [UserModule, PrismaModule, AuthModule, TripModule],
})
export class AppModule {}
