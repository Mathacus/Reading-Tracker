/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ReadingSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" DATETIME NOT NULL,
    "bookTitle" TEXT NOT NULL,
    CONSTRAINT "ReadingSession_bookTitle_fkey" FOREIGN KEY ("bookTitle") REFERENCES "Book" ("title") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingSession_bookTitle_day_key" ON "ReadingSession"("bookTitle", "day");

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
