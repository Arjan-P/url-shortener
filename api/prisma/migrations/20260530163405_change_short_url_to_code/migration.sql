/*
  Warnings:

  - You are about to drop the column `short_url` on the `urls` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `urls` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "urls_short_url_idx";

-- DropIndex
DROP INDEX "urls_short_url_key";

-- AlterTable
ALTER TABLE "urls" DROP COLUMN "short_url",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "urls_code_key" ON "urls"("code");

-- CreateIndex
CREATE INDEX "urls_code_idx" ON "urls"("code");
