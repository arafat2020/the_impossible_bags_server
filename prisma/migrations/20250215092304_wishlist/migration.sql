-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "wWshListId" TEXT;

-- CreateTable
CREATE TABLE "wWshList" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "wWshList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wWshList_userId_key" ON "wWshList"("userId");

-- AddForeignKey
ALTER TABLE "wWshList" ADD CONSTRAINT "wWshList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_wWshListId_fkey" FOREIGN KEY ("wWshListId") REFERENCES "wWshList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
