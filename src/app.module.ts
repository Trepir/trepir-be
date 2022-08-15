import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ActivityModule } from './activity/activity.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		UserModule,
		PrismaModule,
		ActivityModule,
		ConfigModule.forRoot({ isGlobal: true }),
	],
})
export class AppModule {}
