import { Module } from '@nestjs/common';
import { AccomodationService } from './accomodation.service';

@Module({
	providers: [AccomodationService],
})
export class AccomodationModule {}
