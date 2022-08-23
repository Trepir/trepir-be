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
import {
	AccommodationDto,
	UpdateAccommodationDto,
} from 'src/accommodation/dto';
import { TravelEventDto, UpdateTravelEventDto } from 'src/travelEvent/dto';
import { TravelEventService } from 'src/travelEvent/travelEvent.service';
import {
	ActivityDayChangeDto,
	AddActivityDto,
	DeleteDto,
	ReorderDto,
} from 'src/edit-trip/dto';
import { EditTripService } from 'src/edit-trip/edit-trip.service';
import { DeleteShareDto, ShareTripDto } from 'src/shared-trip/dto';
import { SharedTripService } from 'src/shared-trip/shared-trip.service';

@Controller('trip')
export class TripController {
	constructor(
		private tripService: TripService,
		private accommodationService: AccommodationService,
		private travelEventService: TravelEventService,
		private editTripService: EditTripService,
		private sharedTripService: SharedTripService
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

	@Put('eventChangeDay')
	eventChangeDay(@Body() dto: ActivityDayChangeDto) {
		return this.editTripService.eventChangeDay(dto);
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

	@Put('updateAccommodation')
	updateAccommodation(@Body() dto: UpdateAccommodationDto) {
		return this.accommodationService.updateAccommodation(dto);
	}

	@Put('updateTravelEvent')
	updateTravelEvent(@Body() dto: UpdateTravelEventDto) {
		return this.travelEventService.updateTravelEvent(dto);
	}

	@Post('share')
	share(@Body() dto: ShareTripDto) {
		return this.sharedTripService.share(dto);
	}

	@Delete('unshareTrip')
	unshareTrip(@Body() dto: DeleteShareDto) {
		return this.sharedTripService.unshareTrip(dto);
	}
}
