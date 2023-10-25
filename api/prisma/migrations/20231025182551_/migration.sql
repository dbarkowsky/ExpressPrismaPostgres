/*
  Warnings:

  - The primary key for the `SeriesCharacter` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SeriesCharacter" DROP CONSTRAINT "SeriesCharacter_pkey",
ADD CONSTRAINT "SeriesCharacter_pkey" PRIMARY KEY ("seriesName", "seriesFirstIssue", "characterKey");
