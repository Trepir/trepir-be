import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import {
	ActivityDto,
	FavoriteActivityDto,
	ActivityByCoordinatesDto,
} from './dto';

@Controller('activity')
export class ActivityController {
	constructor(private activityService: ActivityService) {}

	@Post('create')
	create(@Body() dto: ActivityDto) {
		return this.activityService.create(dto);
	}

	@Get('all')
	all() {
		return this.activityService.all();
	}

	@Post('favorite')
	favorite(@Body() dto: FavoriteActivityDto) {
		return this.activityService.favorite(dto);
	}
	@Post('coordinates')
	coordinates(@Body() dto: ActivityByCoordinatesDto) {
		return this.activityService.coordinates(dto);
	}
}
