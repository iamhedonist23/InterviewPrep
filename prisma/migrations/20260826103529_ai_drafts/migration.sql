-- CreateTable
CREATE TABLE "AiQuestionDraft" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "subcategoryId" TEXT,
    "experienceLevel" "ExperienceLevel" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "interviewType" "InterviewType" NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "sampleAnswer" TEXT NOT NULL,
    "keyPoints" JSONB NOT NULL,
    "commonMistakes" JSONB NOT NULL,
    "followUpQuestions" JSONB NOT NULL,
    "tags" JSONB NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiQuestionDraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiQuestionDraft_isPublished_isApproved_createdAt_idx" ON "AiQuestionDraft"("isPublished", "isApproved", "createdAt");

-- CreateIndex
CREATE INDEX "AiQuestionDraft_categoryId_idx" ON "AiQuestionDraft"("categoryId");

-- CreateIndex
CREATE INDEX "InterviewQuestion_difficulty_experienceLevel_interviewType__idx" ON "InterviewQuestion"("difficulty", "experienceLevel", "interviewType", "isPublished");

-- AddForeignKey
ALTER TABLE "AiQuestionDraft" ADD CONSTRAINT "AiQuestionDraft_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
