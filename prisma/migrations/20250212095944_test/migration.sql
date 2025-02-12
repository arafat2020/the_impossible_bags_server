/*
  Warnings:

  - You are about to drop the column `primaryImg` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `showcaseImage` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[primaryImgId]` on the table `FileInstance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FileInstance" ADD COLUMN     "primaryImgId" TEXT,
ADD COLUMN     "showcaseImageId" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "primaryImg",
DROP COLUMN "showcaseImage";

-- CreateTable
CREATE TABLE "ShowcaseImage" (
    "id" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "ShowcaseImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShowcaseImage_productId_key" ON "ShowcaseImage"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "FileInstance_primaryImgId_key" ON "FileInstance"("primaryImgId");

-- AddForeignKey
ALTER TABLE "ShowcaseImage" ADD CONSTRAINT "ShowcaseImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileInstance" ADD CONSTRAINT "FileInstance_primaryImgId_fkey" FOREIGN KEY ("primaryImgId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileInstance" ADD CONSTRAINT "FileInstance_showcaseImageId_fkey" FOREIGN KEY ("showcaseImageId") REFERENCES "ShowcaseImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
