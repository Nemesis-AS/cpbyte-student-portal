/*
  Warnings:

  - Added the required column `subject` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('DSA', 'DEV');

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "subject" "Subject" NOT NULL;
