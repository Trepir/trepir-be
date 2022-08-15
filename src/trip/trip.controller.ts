import { Controller, Post, Body } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripDto } from './dto';

@Controller('trip')
export class TripController {
	constructor(private tripService: TripService) {}
	@Post('create')
	signup(@Body() tripDto: TripDto) {
		//dto:data transfer object
		// return this.tripService.create(tripDto);
	}
}
