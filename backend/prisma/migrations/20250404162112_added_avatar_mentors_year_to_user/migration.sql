-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "mentor_dev" TEXT,
ADD COLUMN     "mentor_dsa" TEXT,
ADD COLUMN     "year" INTEGER NOT NULL DEFAULT 1;
