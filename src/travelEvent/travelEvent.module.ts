import { Global, Module } from '@nestjs/common';
import { AccommodationModule } from 'src/accommodation/accommodation.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TravelEventController } from './travelEvent.controller';
import { TravelEventService } from './travelEvent.service';

@Module({
	imports: [PrismaModule, AccommodationModule],
	controllers: [TravelEventController],
	exports: [TravelEventService],
	providers: [TravelEventService],
})
export class TravelEventModule {}
