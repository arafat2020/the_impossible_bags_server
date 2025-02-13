-- DropForeignKey
ALTER TABLE "FileInstance" DROP CONSTRAINT "FileInstance_userId_fkey";

-- AlterTable
ALTER TABLE "FileInstance" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FileInstance" ADD CONSTRAINT "FileInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
