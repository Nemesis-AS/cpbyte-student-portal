-- CreateTable
CREATE TABLE "TrackerDashboard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "past5" INTEGER[],
    "rank" INTEGER NOT NULL DEFAULT 0,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackerDashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leetcode" (
    "id" TEXT NOT NULL,
    "trackerId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "solvedProblems" INTEGER NOT NULL DEFAULT 0,
    "easy" INTEGER NOT NULL DEFAULT 0,
    "medium" INTEGER NOT NULL DEFAULT 0,
    "hard" INTEGER NOT NULL DEFAULT 0,
    "calendar" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leetcode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitHub" (
    "id" TEXT NOT NULL,
    "trackerId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "contributions" INTEGER NOT NULL DEFAULT 0,
    "prs" INTEGER NOT NULL DEFAULT 0,
    "repos" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GitHub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "trackerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackerDashboard_userId_key" ON "TrackerDashboard"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Leetcode_trackerId_key" ON "Leetcode"("trackerId");

-- CreateIndex
CREATE UNIQUE INDEX "GitHub_trackerId_key" ON "GitHub"("trackerId");

-- AddForeignKey
ALTER TABLE "TrackerDashboard" ADD CONSTRAINT "TrackerDashboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leetcode" ADD CONSTRAINT "Leetcode_trackerId_fkey" FOREIGN KEY ("trackerId") REFERENCES "TrackerDashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitHub" ADD CONSTRAINT "GitHub_trackerId_fkey" FOREIGN KEY ("trackerId") REFERENCES "TrackerDashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_trackerId_fkey" FOREIGN KEY ("trackerId") REFERENCES "TrackerDashboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
