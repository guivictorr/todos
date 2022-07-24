/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "color" VARCHAR(7) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Collection_color_key" ON "Collection"("color");
