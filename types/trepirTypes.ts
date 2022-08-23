/**
 * Model User
 *
 */
export type User = {
	id: string;
	createdAt: Date;
	firstName: string;
	lastName: string;
	displayName: string;
	email: string;
	uid: string;
	photoUrl: string;
	emailVerified: boolean;
	sharedTrips?: Trip[];
};

/**
 * Model Trip
 *
 */
export type Trip = {
	id: string;
	createdAt: Date;
	userId: string;
	startDate: Date;
	endDate: Date;
	name: string;
	googlePlaceId: string;
	latitude: number;
	longitude: number;
	formattedAddress: string;
	participants?: User[];
	googleLocationName: string;
	photoUrl: string | null;
};

/**
 * Model SharedTrips
 *
 */
export type SharedTrips = {
	id: string;
	participantId: string;
	sharedTripId: string;
};

/**
 * Model TripDay
 *
 */
export type TripDay = {
	id: string;
	dayIndex: number;
	tripId: string;
};

/**
 * Model TripDayActivity
 *
 */
export type TripDayActivity = {
	id: string;
	tripDayId: string;
	order: number;
	accommodation?: Accommodation;
	travelEvents?: TravelEvent;
	dayActivity?: DayActivity;
};

/**
 * Model DayActivity
 *
 */
export type DayActivity = {
	id: string;
	createdAt: Date;
	activityId: string;
	time: Date | null;
	tripDayActivityId: string | null;
};

/**
 * Model FavoriteActivity
 *
 */
export type FavoriteActivity = {
	id: number;
	createdAt: Date;
	activityId: string;
	userId: string;
	tripId: string | null;
};

/**
 * Model Accommodation
 *
 */
export type Accommodation = {
	id: string;
	createdAt: Date;
	date: Date;
	state: AccommodationState;
	eventType: EventType;
	locationId: string;
	location: Location;
	tripDayActivityId: string | null;
	accommodationPairId: string | null;
};

/**
 * Model Location
 *
 */
export type Location = {
	id: string;
	createdAt: Date;
	latitude: number;
	longitude: number;
	country: string | null;
	state: string | null;
	photoUrl: string[];
	formattedAddress: string;
	locationName: string;
	city: string | null;
	googleId: string | null;
};

/**
 * Model TravelEvent
 *
 */
export type TravelEvent = {
	id: string;
	createdAt: Date;
	originLocation: Location;
	originLocationId: string;
	destinationLocation: Location;
	destinationLocationId: string;
	type: TravelType;
	departure: Date;
	eventType: EventType;
	tripDayActivityId: string | null;
};

/**
 * Model Activity
 *
 */
export type Activity = {
	id: string;
	createdAt: Date;
	name: string;
	duration: number;
	imageUrl: string | null;
	description: string;
	time: Date | null;
	rating: number | null;
	locationId: string;
	tags: Tag[];
	creatorId: string;
	eventType: EventType;
};

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const AccommodationState = {
	CheckIn: 'CheckIn',
	CheckOut: 'CheckOut',
};

export type AccommodationState =
	typeof AccommodationState[keyof typeof AccommodationState];

export const EventType = {
	TravelEvent: 'TravelEvent',
	Accommodation: 'Accommodation',
	Activity: 'Activity',
};

export type EventType = typeof EventType[keyof typeof EventType];

export const Tag = {
	Relax: 'Relax',
	Landmark: 'Landmark',
	Entertainment: 'Entertainment',
	Drinks: 'Drinks',
	Restaurant: 'Restaurant',
	Adventure: 'Adventure',
	Museum: 'Museum',
	Outdoors: 'Outdoors',
	Tour: 'Tour',
	Beach: 'Beach',
	Culture: 'Culture',
	Nightlife: 'Nightlife',
	Nature: 'Nature',
	Festivity: 'Festivity',
	Sport: 'Sport',
};

export type Tag = typeof Tag[keyof typeof Tag];

export const TravelType = {
	Flight: 'Flight',
	Bus: 'Bus',
	Boat: 'Boat',
	Car: 'Car',
	Train: 'Train',
};

export type TravelType = typeof TravelType[keyof typeof TravelType];
