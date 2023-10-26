-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `team_id` INTEGER NULL,
    `nationality` VARCHAR(255) NULL,
    `position` VARCHAR(255) NULL,
    `salary` DECIMAL(10, 2) NOT NULL,
    `imagePath` VARCHAR(255) NULL,

    INDEX `team_id`(`team_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
