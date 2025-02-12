-- CreateTable
CREATE TABLE "FileInstance" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileid" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileInstance_pkey" PRIMARY KEY ("id")
);
