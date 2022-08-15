import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityDto, LocationDto } from './dto';
ActivityDto;

@Controller('activity')
export class ActivityController {
	constructor(private activityService: ActivityService) {}

	@Post('create')
	create(@Body() dto: ActivityDto & LocationDto) {
		return this.activityService.create(dto);
	}

	@Get('all')
	all() {
		return this.activityService.all();
	}
}
