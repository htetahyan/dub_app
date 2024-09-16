/*
  Warnings:

  - You are about to drop the column `totalMinutes` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `usedMinutes` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `minutesAllocated` on the `SubscriptionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `minutesUsed` on the `SubscriptionHistory` table. All the data in the column will be lost.
  - Added the required column `creditAllocated` to the `SubscriptionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditsUsed` to the `SubscriptionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "totalMinutes",
DROP COLUMN "usedMinutes",
ADD COLUMN     "totalCredits" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "usedCredits" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionHistory" DROP COLUMN "minutesAllocated",
DROP COLUMN "minutesUsed",
ADD COLUMN     "creditAllocated" INTEGER NOT NULL,
ADD COLUMN     "creditsUsed" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
