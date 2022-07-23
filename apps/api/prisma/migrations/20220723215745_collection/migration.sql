-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "collection" TEXT;

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_collection_fkey" FOREIGN KEY ("collection") REFERENCES "Collection"("name") ON DELETE SET NULL ON UPDATE CASCADE;
