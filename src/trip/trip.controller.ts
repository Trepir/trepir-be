import { Controller, Post, Body, Put } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripDto, updateTripDto } from './dto';

@Controller('trip')
export class TripController {
	constructor(private tripService: TripService) {}
	@Post('create')
	create(@Body() tripDto: TripDto) {
		//dto:data transfer object
		return this.tripService.create(tripDto);
	}
	// @Put('update')
	// update(@Body() tripDto: updateTripDto) {
	// 	return this.tripService.update(tripDto);
	// }
}
