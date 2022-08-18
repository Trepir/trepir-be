import { Module } from '@nestjs/common';
import { TravelEventModule } from 'src/travelEvent/travelEvent.module';
import { TravelEventService } from 'src/travelEvent/travelEvent.service';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
	controllers: [TripController],
	providers: [TripService, TravelEventService],
	imports: [TravelEventModule],
})
export class TripModule {}
