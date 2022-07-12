-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(45) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtodo" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(45) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentTodoId" TEXT NOT NULL,

    CONSTRAINT "Subtodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "password" VARCHAR(75) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtodo" ADD CONSTRAINT "Subtodo_parentTodoId_fkey" FOREIGN KEY ("parentTodoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
