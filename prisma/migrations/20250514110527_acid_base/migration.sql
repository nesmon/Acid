-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "discordId" INTEGER NOT NULL,
    "kamaiApiKey" TEXT NOT NULL,
    "kamaiUser" TEXT NOT NULL,
    "maiteaApiKey" TEXT NOT NULL,
    "misslessApiKey" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_kamaiApiKey_key" ON "User"("kamaiApiKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_kamaiUser_key" ON "User"("kamaiUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_maiteaApiKey_key" ON "User"("maiteaApiKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_misslessApiKey_key" ON "User"("misslessApiKey");
