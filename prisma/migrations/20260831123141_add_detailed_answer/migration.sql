-- AlterTable
ALTER TABLE "AiQuestionDraft" ADD COLUMN     "detailedAnswer" TEXT;

-- AlterTable
ALTER TABLE "InterviewQuestion" ADD COLUMN     "detailedAnswer" TEXT;

-- AlterTable
ALTER TABLE "StudyTopic" ADD COLUMN     "prerequisiteIds" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "relatedTopicIds" JSONB NOT NULL DEFAULT '[]';
