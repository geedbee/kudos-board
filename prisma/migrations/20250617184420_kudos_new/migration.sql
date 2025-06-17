/*
  Warnings:

  - You are about to drop the column `image_url` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Card` table. All the data in the column will be lost.
  - Added the required column `image` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "image_url",
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "image_url",
ADD COLUMN     "image" TEXT NOT NULL;
