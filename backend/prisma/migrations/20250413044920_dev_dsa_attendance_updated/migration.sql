/*
  Warnings:

  - Added the required column `devAttendance` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dsaAttendance` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "devAttendance" INTEGER NOT NULL,
ADD COLUMN     "dsaAttendance" INTEGER NOT NULL;
