import { Module } from '@nestjs/common';
import { EditTripModule } from 'src/edit-trip/edit-trip.module';
import { EditTripService } from 'src/edit-trip/edit-trip.service';
import { SharedTripModule } from 'src/shared-trip/shared-trip.module';
import { TravelEventModule } from 'src/travelEvent/travelEvent.module';
import { TravelEventService } from 'src/travelEvent/travelEvent.service';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
	controllers: [TripController],
	providers: [TripService, TravelEventService, EditTripService],
	imports: [TravelEventModule, EditTripModule, SharedTripModule],
})
export class TripModule {}
