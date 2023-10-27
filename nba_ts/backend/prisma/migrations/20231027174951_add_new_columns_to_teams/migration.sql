/*
  Warnings:

  - You are about to alter the column `name` on the `teams` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - Added the required column `city` to the `teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conference` to the `teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `division` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `teams` ADD COLUMN `city` VARCHAR(20) NOT NULL,
    ADD COLUMN `conference` VARCHAR(7) NOT NULL,
    ADD COLUMN `division` VARCHAR(9) NOT NULL,
    MODIFY `name` VARCHAR(50) NOT NULL;
