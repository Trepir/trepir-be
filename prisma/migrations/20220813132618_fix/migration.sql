/*
  Warnings:

  - You are about to drop the column `TripId` on the `FavoriteActivity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FavoriteActivity" DROP COLUMN "TripId",
ADD COLUMN     "tripId" TEXT;
