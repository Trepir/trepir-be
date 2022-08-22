import {
	Controller,
	Post,
	Body,
	Put,
	Get,
	Param,
	Delete,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { TripDto, tripIdDto, UpdateTripDto } from './dto';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import {
	AccommodationDto,
	UpdateAccommodationDto,
} from 'src/accommodation/dto';
import { TravelEventDto } from 'src/travelEvent/dto';
import { TravelEventService } from 'src/travelEvent/travelEvent.service';
import { AddActivityDto, DeleteDto, ReorderDto } from 'src/edit-trip/dto';
import { EditTripService } from 'src/edit-trip/edit-trip.service';

@Controller('trip')
export class TripController {
	constructor(
		private tripService: TripService,
		private accommodationService: AccommodationService,
		private travelEventService: TravelEventService,
		private editTripService: EditTripService
	) {}
	@Post('create')
	create(@Body() tripDto: TripDto) {
		return this.tripService.create(tripDto);
	}
	@Put('updateTripInfo')
	updateTrip(@Body() tripDto: UpdateTripDto) {
		return this.tripService.updateTrip(tripDto);
	}
	@Post('addAccommodation')
	addAccommodation(@Body() accommodationDto: AccommodationDto) {
		return this.accommodationService.addAccommodation(accommodationDto);
	}
	@Post('addTravelEvent')
	addTravelEvent(@Body() travelEventDto: TravelEventDto) {
		return this.travelEventService.addTravelEvent(travelEventDto);
	}
	@Post('addActivity')
	addActivity(@Body() addActivityDto: AddActivityDto) {
		return this.editTripService.addActivity(addActivityDto);
	}

	@Delete('deleteEvent')
	deleteEvent(@Body() deleteDto: DeleteDto) {
		return this.editTripService.deleteActivity(deleteDto);
	}
	@Get('tripById/:id')
	tripById(@Param('id') id) {
		return this.tripService.tripById(id);
	}

	@Put('reorderDay')
	reorderDayActiviy(@Body() dto: ReorderDto) {
		return this.editTripService.reorderDayActivity(dto);
	}

	@Put('updateAccommodation')
	updateAccommodation(@Body() dto: UpdateAccommodationDto) {
		return this.accommodationService.updateAccommodation(dto);
	}
}
