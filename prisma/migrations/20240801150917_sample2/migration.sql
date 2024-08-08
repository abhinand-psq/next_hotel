/*
  Warnings:

  - A unique constraint covering the columns `[place]` on the table `testing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `place` to the `testing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "testing" ADD COLUMN     "place" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "testing_place_key" ON "testing"("place");
