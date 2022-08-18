import { Controller, Post, Body, Put, Get, Param } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripDto, tripIdDto, updateTripDto } from './dto';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { AccommodationDto } from 'src/accommodation/dto';
import { TravelEventDto } from 'src/travelEvent/dto';
import { TravelEventService } from 'src/travelEvent/travelEvent.service';
@Controller('trip')
export class TripController {
	constructor(
		private tripService: TripService,
		private accommodationService: AccommodationService,
		private travelEventService: TravelEventService
	) {}
	@Post('create')
	create(@Body() tripDto: TripDto) {
		return this.tripService.create(tripDto);
	}
	// @Put('update')
	// update(@Body() tripDto: updateTripDto) {
	//  return this.tripService.update(tripDto);
	// }
	@Post('addAccommodation')
	addAccommodation(@Body() accommodationDto: AccommodationDto) {
		return this.accommodationService.addAccommodation(accommodationDto);
	}
	@Post('addTravelEvent')
	addTravelEvent(@Body() travelEventDto: TravelEventDto) {
		return this.travelEventService.addTravelEvent(travelEventDto);
	}
	@Get('tripById/:id')
	tripById(@Param('id') id) {
		return this.tripService.tripById(id);
	}
}
