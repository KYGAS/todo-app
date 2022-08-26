/*
  Warnings:

  - You are about to drop the `Organisation_Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project_Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task_Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Organisation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Organisation_Project` DROP FOREIGN KEY `Organisation_Project_organisation_id_fkey`;

-- DropForeignKey
ALTER TABLE `Organisation_Project` DROP FOREIGN KEY `Organisation_Project_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `Project_Task` DROP FOREIGN KEY `Project_Task_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `Project_Task` DROP FOREIGN KEY `Project_Task_task_id_fkey`;

-- DropForeignKey
ALTER TABLE `Task_Message` DROP FOREIGN KEY `Task_Message_message_id_fkey`;

-- DropForeignKey
ALTER TABLE `Task_Message` DROP FOREIGN KEY `Task_Message_task_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Organisation` DROP FOREIGN KEY `User_Organisation_organisation_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Organisation` DROP FOREIGN KEY `User_Organisation_user_id_fkey`;

-- DropTable
DROP TABLE `Organisation_Project`;

-- DropTable
DROP TABLE `Project_Task`;

-- DropTable
DROP TABLE `Task_Message`;

-- DropTable
DROP TABLE `User_Organisation`;

-- CreateTable
CREATE TABLE `UserOnOrganisation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `organisation_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationOnProject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organisation_id` INTEGER NOT NULL,
    `project_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectOnTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `task_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskOnMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_id` INTEGER NOT NULL,
    `message_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserOnOrganisation` ADD CONSTRAINT `UserOnOrganisation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOnOrganisation` ADD CONSTRAINT `UserOnOrganisation_organisation_id_fkey` FOREIGN KEY (`organisation_id`) REFERENCES `Organisation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationOnProject` ADD CONSTRAINT `OrganisationOnProject_organisation_id_fkey` FOREIGN KEY (`organisation_id`) REFERENCES `Organisation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationOnProject` ADD CONSTRAINT `OrganisationOnProject_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectOnTask` ADD CONSTRAINT `ProjectOnTask_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectOnTask` ADD CONSTRAINT `ProjectOnTask_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskOnMessage` ADD CONSTRAINT `TaskOnMessage_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskOnMessage` ADD CONSTRAINT `TaskOnMessage_message_id_fkey` FOREIGN KEY (`message_id`) REFERENCES `Message`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
