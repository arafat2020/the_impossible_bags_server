/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `FileInstance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `FileInstance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileInstance" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FileInstance_userId_key" ON "FileInstance"("userId");

-- AddForeignKey
ALTER TABLE "FileInstance" ADD CONSTRAINT "FileInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
