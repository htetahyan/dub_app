-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "picture" TEXT NOT NULL DEFAULT 'https://tse3.mm.bing.net/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&pid=Api&P=0&h=180',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
