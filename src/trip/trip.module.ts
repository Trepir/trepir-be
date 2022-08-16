import { Module } from '@nestjs/common';
import { TravelEventService } from 'src/travelEvent/travelEvent.service';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
	controllers: [TripController],
	providers: [TripService],
	imports: [TravelEventService],
})
export class TripModule {}
