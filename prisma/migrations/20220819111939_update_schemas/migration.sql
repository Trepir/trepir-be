/*
  Warnings:

  - Added the required column `formattedAddress` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "formattedAddress" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT[],
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;
