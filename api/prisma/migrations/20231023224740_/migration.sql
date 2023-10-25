/*
  Warnings:

  - You are about to drop the column `seriesFirstIssue` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `seriesName` on the `Character` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,latitude,longitude]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_seriesName_seriesFirstIssue_fkey";

-- DropIndex
DROP INDEX "City_name_key";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "seriesFirstIssue",
DROP COLUMN "seriesName";

-- CreateTable
CREATE TABLE "SeriesCharacter" (
    "seriesName" TEXT NOT NULL,
    "seriesFirstIssue" TIMESTAMP(3) NOT NULL,
    "characterKey" INTEGER NOT NULL,

    CONSTRAINT "SeriesCharacter_pkey" PRIMARY KEY ("seriesName","seriesFirstIssue")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_latitude_longitude_key" ON "City"("name", "latitude", "longitude");

-- AddForeignKey
ALTER TABLE "SeriesCharacter" ADD CONSTRAINT "SeriesCharacter_seriesName_seriesFirstIssue_fkey" FOREIGN KEY ("seriesName", "seriesFirstIssue") REFERENCES "Series"("name", "firstIssue") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesCharacter" ADD CONSTRAINT "SeriesCharacter_characterKey_fkey" FOREIGN KEY ("characterKey") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
