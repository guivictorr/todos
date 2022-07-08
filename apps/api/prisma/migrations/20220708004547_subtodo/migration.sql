-- CreateTable
CREATE TABLE "Subtodo" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(45) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentTodoId" TEXT,

    CONSTRAINT "Subtodo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subtodo" ADD CONSTRAINT "Subtodo_parentTodoId_fkey" FOREIGN KEY ("parentTodoId") REFERENCES "Todo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
