-- DropForeignKey
ALTER TABLE "DubbingProject" DROP CONSTRAINT "DubbingProject_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "DubbingProject" ALTER COLUMN "subscriptionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DubbingProject" ADD CONSTRAINT "DubbingProject_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
