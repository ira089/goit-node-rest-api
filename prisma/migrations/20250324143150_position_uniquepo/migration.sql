/*
  Warnings:

  - A unique constraint covering the columns `[position_name]` on the table `positions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "positions_position_name_key" ON "positions"("position_name");
