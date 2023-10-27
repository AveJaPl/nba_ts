/*
  Warnings:

  - You are about to drop the column `conference` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `division` on the `teams` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imagePath]` on the table `players` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `teams` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `conference_id` to the `teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `division_id` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `teams` DROP COLUMN `conference`,
    DROP COLUMN `division`,
    ADD COLUMN `conference_id` INTEGER NOT NULL,
    ADD COLUMN `division_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `conferences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(7) NOT NULL,

    UNIQUE INDEX `conferences_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `divisions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(9) NOT NULL,

    UNIQUE INDEX `divisions_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `players_imagePath_key` ON `players`(`imagePath`);

-- CreateIndex
CREATE UNIQUE INDEX `teams_name_key` ON `teams`(`name`);

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`conference_id`) REFERENCES `conferences`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_ibfk_2` FOREIGN KEY (`division_id`) REFERENCES `divisions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
