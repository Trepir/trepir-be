import { Global, Module } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';

@Global()
@Module({
	providers: [AccommodationService],
	exports: [AccommodationService],
})
export class AccommodationModule {}
