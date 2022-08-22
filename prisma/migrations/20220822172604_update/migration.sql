-- CreateEnum
CREATE TYPE "tags" AS ENUM ('Relax', 'Landmark', 'Entertainment', 'Drinks', 'Restaurant', 'Adventure', 'Museum', 'Outdoors', 'Tour', 'Beach', 'Culture', 'Nightlife', 'Nature', 'Festivity', 'Sport');

-- CreateEnum
CREATE TYPE "TravelType" AS ENUM ('Flight', 'Bus', 'Boat', 'Car', 'Train');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('TravelEvent', 'Accommodation', 'Activity');

-- CreateEnum
CREATE TYPE "AccommodationState" AS ENUM ('CheckIn', 'CheckOut');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "googlePlaceId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "formattedAddress" TEXT NOT NULL,
    "googleLocationName" TEXT NOT NULL,
    "photoUrl" TEXT,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripDay" (
    "id" TEXT NOT NULL,
    "dayIndex" INTEGER NOT NULL,
    "tripId" TEXT NOT NULL,

    CONSTRAINT "TripDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripDayActivity" (
    "id" TEXT NOT NULL,
    "tripDayId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "TripDayActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayActivity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activityId" TEXT NOT NULL,
    "time" TIMESTAMP(3),
    "tripDayActivityId" TEXT,

    CONSTRAINT "DayActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tripId" TEXT,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "state" "AccommodationState" NOT NULL,
    "eventType" "EventType" NOT NULL DEFAULT 'Accommodation',
    "accommodationPairId" TEXT,
    "locationId" TEXT NOT NULL,
    "tripDayActivityId" TEXT,

    CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "photoUrl" TEXT[],
    "formattedAddress" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "city" TEXT,
    "googleId" TEXT,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "originLocationId" TEXT NOT NULL,
    "destinationLocationId" TEXT NOT NULL,
    "type" "TravelType" NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "eventType" "EventType" NOT NULL DEFAULT 'TravelEvent',
    "tripDayActivityId" TEXT,

    CONSTRAINT "travel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "time" TIMESTAMP(3),
    "rating" INTEGER,
    "locationId" TEXT NOT NULL,
    "tags" "tags"[],
    "creatorId" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL DEFAULT 'Activity',

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_uid_key" ON "users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "TripDayActivity_id_key" ON "TripDayActivity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DayActivity_id_key" ON "DayActivity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DayActivity_tripDayActivityId_key" ON "DayActivity"("tripDayActivityId");

-- CreateIndex
CREATE UNIQUE INDEX "accommodations_accommodationPairId_key" ON "accommodations"("accommodationPairId");

-- CreateIndex
CREATE UNIQUE INDEX "accommodations_tripDayActivityId_key" ON "accommodations"("tripDayActivityId");

-- CreateIndex
CREATE UNIQUE INDEX "locations_googleId_key" ON "locations"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "travel_tripDayActivityId_key" ON "travel"("tripDayActivityId");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripDay" ADD CONSTRAINT "TripDay_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripDayActivity" ADD CONSTRAINT "TripDayActivity_tripDayId_fkey" FOREIGN KEY ("tripDayId") REFERENCES "TripDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayActivity" ADD CONSTRAINT "DayActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayActivity" ADD CONSTRAINT "DayActivity_tripDayActivityId_fkey" FOREIGN KEY ("tripDayActivityId") REFERENCES "TripDayActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_accommodationPairId_fkey" FOREIGN KEY ("accommodationPairId") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_tripDayActivityId_fkey" FOREIGN KEY ("tripDayActivityId") REFERENCES "TripDayActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel" ADD CONSTRAINT "travel_originLocationId_fkey" FOREIGN KEY ("originLocationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel" ADD CONSTRAINT "travel_destinationLocationId_fkey" FOREIGN KEY ("destinationLocationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel" ADD CONSTRAINT "travel_tripDayActivityId_fkey" FOREIGN KEY ("tripDayActivityId") REFERENCES "TripDayActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
