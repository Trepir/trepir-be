/*
  Warnings:

  - You are about to drop the column `participantId` on the `SharedTrips` table. All the data in the column will be lost.
  - Added the required column `participantEmail` to the `SharedTrips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SharedTrips" DROP CONSTRAINT "SharedTrips_participantId_fkey";

-- DropForeignKey
ALTER TABLE "SharedTrips" DROP CONSTRAINT "SharedTrips_sharedTripId_fkey";

-- AlterTable
ALTER TABLE "SharedTrips" DROP COLUMN "participantId",
ADD COLUMN     "participantEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SharedTrips" ADD CONSTRAINT "SharedTrips_sharedTripId_fkey" FOREIGN KEY ("sharedTripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedTrips" ADD CONSTRAINT "SharedTrips_participantEmail_fkey" FOREIGN KEY ("participantEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
