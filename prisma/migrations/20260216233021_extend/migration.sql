/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `RomHack` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `RomHack` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pokemon_name_key";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RomHack" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_slug_key" ON "Pokemon"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RomHack_slug_key" ON "RomHack"("slug");
