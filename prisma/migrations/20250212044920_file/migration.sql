/*
  Warnings:

  - You are about to drop the column `fileid` on the `FileInstance` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `FileInstance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileInstance" DROP COLUMN "fileid",
ADD COLUMN     "fileId" TEXT NOT NULL;
