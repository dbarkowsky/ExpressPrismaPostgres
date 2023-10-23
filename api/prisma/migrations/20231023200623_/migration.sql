-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "seriesName" TEXT NOT NULL,
    "seriesFirstIssue" TIMESTAMP(3) NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "name" TEXT NOT NULL,
    "firstIssue" TIMESTAMP(3) NOT NULL,
    "companyName" TEXT NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("name","firstIssue")
);

-- CreateTable
CREATE TABLE "Company" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_seriesName_seriesFirstIssue_fkey" FOREIGN KEY ("seriesName", "seriesFirstIssue") REFERENCES "Series"("name", "firstIssue") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_companyName_fkey" FOREIGN KEY ("companyName") REFERENCES "Company"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
