/*
  Warnings:

  - A unique constraint covering the columns `[slug,romHackId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Location_name_romHackId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Location_slug_romHackId_key" ON "Location"("slug", "romHackId");
