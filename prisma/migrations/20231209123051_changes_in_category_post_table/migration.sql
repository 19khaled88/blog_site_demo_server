/*
  Warnings:

  - You are about to drop the column `postId` on the `categories` table. All the data in the column will be lost.
  - Added the required column `cate_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_postId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "cate_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_cate_id_fkey" FOREIGN KEY ("cate_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
