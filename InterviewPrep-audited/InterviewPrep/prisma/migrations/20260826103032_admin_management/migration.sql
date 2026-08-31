-- DropIndex
DROP INDEX "Category_group_idx";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isDisabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Category_group_sortOrder_idx" ON "Category"("group", "sortOrder");
