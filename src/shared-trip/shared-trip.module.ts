import { Module } from '@nestjs/common';
import { SharedTripService } from './shared-trip.service';

@Module({
	providers: [SharedTripService],
	exports: [SharedTripService],
})
export class SharedTripModule {}
