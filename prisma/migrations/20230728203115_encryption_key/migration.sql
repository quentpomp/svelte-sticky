/*
  Warnings:

  - A unique constraint covering the columns `[encryption_key]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "encryption_key" VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "users_encryption_key_key" ON "users"("encryption_key");
