/*
  Warnings:

  - Added the required column `content` to the `ReadingSession` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReadingSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "bookTitle" TEXT NOT NULL,
    CONSTRAINT "ReadingSession_bookTitle_fkey" FOREIGN KEY ("bookTitle") REFERENCES "Book" ("title") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReadingSession" ("bookTitle", "day", "id") SELECT "bookTitle", "day", "id" FROM "ReadingSession";
DROP TABLE "ReadingSession";
ALTER TABLE "new_ReadingSession" RENAME TO "ReadingSession";
CREATE UNIQUE INDEX "ReadingSession_bookTitle_day_key" ON "ReadingSession"("bookTitle", "day");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
