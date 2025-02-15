/*
  Warnings:

  - You are about to drop the column `expiration` on the `Billing` table. All the data in the column will be lost.
  - Added the required column `billingId` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "expiration",
ADD COLUMN     "billingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "billingId" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
