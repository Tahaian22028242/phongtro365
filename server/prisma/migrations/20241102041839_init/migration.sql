/*
  Warnings:

  - Added the required column `price` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `place` ADD COLUMN `price` INTEGER NOT NULL;