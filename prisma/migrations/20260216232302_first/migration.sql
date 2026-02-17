/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('CITY', 'ROUTE', 'CAVE', 'BUILDING', 'OTHER');

-- CreateEnum
CREATE TYPE "EncounterMethod" AS ENUM ('WALK', 'SURF', 'OLD_ROD', 'GOOD_ROD', 'SUPER_ROD', 'ROCK_SMASH', 'HEADBUTT', 'OTHER');

-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('DAY', 'NIGHT', 'MORNING', 'EVENING');

-- CreateEnum
CREATE TYPE "Weather" AS ENUM ('RAIN', 'SANDSTORM', 'HAIL');

-- CreateEnum
CREATE TYPE "ObtainType" AS ENUM ('EVOLUTION', 'TRADE', 'GIFT', 'STARTER', 'FOSSIL', 'EVENT', 'OTHER');

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "RomHack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RomHack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LocationType" NOT NULL,
    "romHackId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "generation" INTEGER NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WildEncounter" (
    "id" TEXT NOT NULL,
    "pokemonId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "method" "EncounterMethod" NOT NULL,
    "rate" DOUBLE PRECISION,
    "minLevel" INTEGER,
    "maxLevel" INTEGER,
    "floor" TEXT,
    "timeOfDay" "TimeOfDay",
    "weather" "Weather" NOT NULL,
    "note" TEXT,

    CONSTRAINT "WildEncounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObtainMethod" (
    "id" TEXT NOT NULL,
    "pokemonId" TEXT NOT NULL,
    "type" "ObtainType" NOT NULL,
    "level" INTEGER,
    "item" TEXT,
    "note" TEXT,

    CONSTRAINT "ObtainMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_romHackId_key" ON "Location"("name", "romHackId");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_romHackId_fkey" FOREIGN KEY ("romHackId") REFERENCES "RomHack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WildEncounter" ADD CONSTRAINT "WildEncounter_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WildEncounter" ADD CONSTRAINT "WildEncounter_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObtainMethod" ADD CONSTRAINT "ObtainMethod_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
