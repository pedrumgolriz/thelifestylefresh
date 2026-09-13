-- CreateTable
CREATE TABLE "HouseConfig" (
    "id" TEXT NOT NULL,
    "memberCap" INTEGER NOT NULL DEFAULT 40,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HouseConfig_pkey" PRIMARY KEY ("id")
);
