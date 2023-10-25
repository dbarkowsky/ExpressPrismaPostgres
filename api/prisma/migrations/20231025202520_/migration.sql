-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_cityId_fkey";

-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "cityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
