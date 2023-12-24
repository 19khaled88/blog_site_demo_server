/*
  Warnings:

  - Added the required column `short_name` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "short_name" TEXT NOT NULL;
