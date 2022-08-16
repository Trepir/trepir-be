import { Controller, Post, Body } from '@nestjs/common';
import { TravelEventService } from './travelEvent.service';
import { LocationDto, TravelEventDto } from './dto';
@Controller('travel-event')
export class TravelEventController {
	constructor(private travelEventService: TravelEventService) {}
	// @Post('create')
	// create(@Body() travelEventDto: TravelEventDto & LocationDto) {
	// 	return this.travelEventService.create(travelEventDto);
	// }
}
