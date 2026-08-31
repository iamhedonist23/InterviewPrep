-- CreateTable
CREATE TABLE "SavedStudyTopic" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedStudyTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyChallenge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeDate" TIMESTAMP(3) NOT NULL,
    "questionIds" JSONB NOT NULL,
    "completedAt" TIMESTAMP(3),
    "score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedStudyTopic_userId_createdAt_idx" ON "SavedStudyTopic"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SavedStudyTopic_userId_topicId_key" ON "SavedStudyTopic"("userId", "topicId");

-- CreateIndex
CREATE INDEX "DailyChallenge_userId_challengeDate_idx" ON "DailyChallenge"("userId", "challengeDate");

-- CreateIndex
CREATE UNIQUE INDEX "DailyChallenge_userId_challengeDate_key" ON "DailyChallenge"("userId", "challengeDate");

-- AddForeignKey
ALTER TABLE "SavedStudyTopic" ADD CONSTRAINT "SavedStudyTopic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedStudyTopic" ADD CONSTRAINT "SavedStudyTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "StudyTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyChallenge" ADD CONSTRAINT "DailyChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
