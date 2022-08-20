/*
  Warnings:

  - You are about to drop the column `tripDayctivityId` on the `DayActivity` table. All the data in the column will be lost.
  - You are about to drop the column `accommodationId` on the `TripDayActivity` table. All the data in the column will be lost.
  - You are about to drop the column `dayActivityId` on the `TripDayActivity` table. All the data in the column will be lost.
  - You are about to drop the column `travelEventId` on the `TripDayActivity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tripDayActivityId]` on the table `DayActivity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tripDayActivityId]` on the table `accommodations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tripDayActivityId]` on the table `travel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TripDayActivity" DROP CONSTRAINT "TripDayActivity_accommodationId_fkey";

-- DropForeignKey
ALTER TABLE "TripDayActivity" DROP CONSTRAINT "TripDayActivity_dayActivityId_fkey";

-- DropForeignKey
ALTER TABLE "TripDayActivity" DROP CONSTRAINT "TripDayActivity_travelEventId_fkey";

-- DropIndex
DROP INDEX "TripDayActivity_accommodationId_key";

-- DropIndex
DROP INDEX "TripDayActivity_dayActivityId_key";

-- DropIndex
DROP INDEX "TripDayActivity_travelEventId_key";

-- AlterTable
ALTER TABLE "DayActivity" DROP COLUMN "tripDayctivityId",
ADD COLUMN     "tripDayActivityId" TEXT;

-- AlterTable
ALTER TABLE "TripDayActivity" DROP COLUMN "accommodationId",
DROP COLUMN "dayActivityId",
DROP COLUMN "travelEventId";

-- CreateIndex
CREATE UNIQUE INDEX "DayActivity_tripDayActivityId_key" ON "DayActivity"("tripDayActivityId");

-- CreateIndex
CREATE UNIQUE INDEX "accommodations_tripDayActivityId_key" ON "accommodations"("tripDayActivityId");

-- CreateIndex
CREATE UNIQUE INDEX "travel_tripDayActivityId_key" ON "travel"("tripDayActivityId");

-- AddForeignKey
ALTER TABLE "DayActivity" ADD CONSTRAINT "DayActivity_tripDayActivityId_fkey" FOREIGN KEY ("tripDayActivityId") REFERENCES "TripDayActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_tripDayActivityId_fkey" FOREIGN KEY ("tripDayActivityId") REFERENCES "TripDayActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel" ADD CONSTRAINT "travel_tripDayActivityId_fkey" FOREIGN KEY ("tripDayActivityId") REFERENCES "TripDayActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
