/*
  Warnings:

  - A unique constraint covering the columns `[pokemonId,locationId,method,minLevel]` on the table `WildEncounter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WildEncounter_pokemonId_locationId_method_minLevel_key" ON "WildEncounter"("pokemonId", "locationId", "method", "minLevel");
