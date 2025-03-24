/*
  Warnings:

  - A unique constraint covering the columns `[sector_name]` on the table `sectors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sectors_sector_name_key" ON "sectors"("sector_name");
