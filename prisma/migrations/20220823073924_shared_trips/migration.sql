-- CreateTable
CREATE TABLE "SharedTrips" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "sharedTripId" TEXT NOT NULL,

    CONSTRAINT "SharedTrips_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SharedTrips" ADD CONSTRAINT "SharedTrips_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedTrips" ADD CONSTRAINT "SharedTrips_sharedTripId_fkey" FOREIGN KEY ("sharedTripId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
