/*
  Warnings:

  - You are about to alter the column `gitgub_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "gitgub_id" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL
);
INSERT INTO "new_users" ("avatar_url", "gitgub_id", "id", "login", "name") SELECT "avatar_url", "gitgub_id", "id", "login", "name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
