/*
  Warnings:

  - You are about to drop the column `content` on the `Event` table. All the data in the column will be lost.
  - Added the required column `category` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('General', 'Class');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "content",
ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "discription" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
