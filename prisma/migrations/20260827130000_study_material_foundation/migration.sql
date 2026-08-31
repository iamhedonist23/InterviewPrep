-- CreateEnum
CREATE TYPE "StudyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'INTERVIEW_PREP');

-- CreateEnum
CREATE TYPE "StudyProgressStatus" AS ENUM ('STARTED', 'COMPLETED');

-- CreateTable
CREATE TABLE "StudyCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPath" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "level" "StudyLevel" NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyModule" (
    "id" TEXT NOT NULL,
    "studyPathId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyTopic" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "estimatedMinutes" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyTopicSection" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyTopicSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyExample" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "explanation" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyExercise" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY',
    "hint" TEXT,
    "solution" TEXT,
    "explanation" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyTopicQuestionRelation" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudyTopicQuestionRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "status" "StudyProgressStatus" NOT NULL DEFAULT 'STARTED',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "StudyProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudyCategory_name_key" ON "StudyCategory"("name");
CREATE UNIQUE INDEX "StudyCategory_slug_key" ON "StudyCategory"("slug");
CREATE INDEX "StudyCategory_isPublished_sortOrder_idx" ON "StudyCategory"("isPublished", "sortOrder");

CREATE UNIQUE INDEX "StudyPath_categoryId_slug_key" ON "StudyPath"("categoryId", "slug");
CREATE UNIQUE INDEX "StudyPath_categoryId_level_key" ON "StudyPath"("categoryId", "level");
CREATE INDEX "StudyPath_categoryId_isPublished_sortOrder_idx" ON "StudyPath"("categoryId", "isPublished", "sortOrder");

CREATE UNIQUE INDEX "StudyModule_studyPathId_slug_key" ON "StudyModule"("studyPathId", "slug");
CREATE INDEX "StudyModule_studyPathId_isPublished_sortOrder_idx" ON "StudyModule"("studyPathId", "isPublished", "sortOrder");

CREATE UNIQUE INDEX "StudyTopic_categoryId_slug_key" ON "StudyTopic"("categoryId", "slug");
CREATE INDEX "StudyTopic_moduleId_isPublished_sortOrder_idx" ON "StudyTopic"("moduleId", "isPublished", "sortOrder");

CREATE INDEX "StudyTopicSection_topicId_sortOrder_idx" ON "StudyTopicSection"("topicId", "sortOrder");
CREATE INDEX "StudyExample_topicId_sortOrder_idx" ON "StudyExample"("topicId", "sortOrder");
CREATE INDEX "StudyExercise_topicId_sortOrder_idx" ON "StudyExercise"("topicId", "sortOrder");

CREATE UNIQUE INDEX "StudyTopicQuestionRelation_topicId_questionId_key" ON "StudyTopicQuestionRelation"("topicId", "questionId");
CREATE INDEX "StudyTopicQuestionRelation_topicId_sortOrder_idx" ON "StudyTopicQuestionRelation"("topicId", "sortOrder");
CREATE INDEX "StudyTopicQuestionRelation_questionId_idx" ON "StudyTopicQuestionRelation"("questionId");

CREATE UNIQUE INDEX "StudyProgress_userId_topicId_key" ON "StudyProgress"("userId", "topicId");
CREATE INDEX "StudyProgress_userId_status_idx" ON "StudyProgress"("userId", "status");
CREATE INDEX "StudyProgress_topicId_idx" ON "StudyProgress"("topicId");

-- AddForeignKey
ALTER TABLE "StudyPath" ADD CONSTRAINT "StudyPath_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "StudyCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyModule" ADD CONSTRAINT "StudyModule_studyPathId_fkey" FOREIGN KEY ("studyPathId") REFERENCES "StudyPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyTopic" ADD CONSTRAINT "StudyTopic_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "StudyModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyTopic" ADD CONSTRAINT "StudyTopic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "StudyCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyTopicSection" ADD CONSTRAINT "StudyTopicSection_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "StudyTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyExample" ADD CONSTRAINT "StudyExample_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "StudyTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyExercise" ADD CONSTRAINT "StudyExercise_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "StudyTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyTopicQuestionRelation" ADD CONSTRAINT "StudyTopicQuestionRelation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "StudyTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyTopicQuestionRelation" ADD CONSTRAINT "StudyTopicQuestionRelation_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyProgress" ADD CONSTRAINT "StudyProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StudyProgress" ADD CONSTRAINT "StudyProgress_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "StudyTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
