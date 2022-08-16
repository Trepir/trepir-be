import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TravelEventController } from './travelEvent.controller';
import { TravelEventService } from './travelEvent.service';

@Module({
	imports: [PrismaModule],
	controllers: [TravelEventController],
	providers: [TravelEventService],
})
export class TravelEventModule {}
