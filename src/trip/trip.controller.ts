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
import { TripDto, UpdateTripDto } from './dto';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { AccommodationDto } from 'src/accommodation/dto';
import { TravelEventDto } from 'src/travelEvent/dto';
import { TravelEventService } from 'src/travelEvent/travelEvent.service';
import {
	ActivityDayChangeDto,
	AddActivityDto,
	DeleteDto,
	ReorderDto,
} from 'src/edit-trip/dto';
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
	@Put('updateTrip')
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

	@Put('activityChangeDay')
	activityChangeDay(@Body() dto: ActivityDayChangeDto) {
		return this.editTripService.activityChangeDay(dto);
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
	reorderDayActivity(@Body() dto: ReorderDto) {
		return this.editTripService.reorderDayActivity(dto);
	}
}
