-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `fName` VARCHAR(191) NOT NULL,
    `lName` VARCHAR(191) NOT NULL,
    `hashedPassword` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `resetToken` VARCHAR(191) NULL,
    `resetTokenExpiresAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organisation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `owner_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `responsible_person_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creator_id` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Organisation` (
    `user_id` INTEGER NOT NULL,
    `organisation_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `organisation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organisation_Project` (
    `organisation_id` INTEGER NOT NULL,
    `project_id` INTEGER NOT NULL,

    PRIMARY KEY (`organisation_id`, `project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project_Task` (
    `project_id` INTEGER NOT NULL,
    `task_id` INTEGER NOT NULL,

    PRIMARY KEY (`project_id`, `task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task_Message` (
    `task_id` INTEGER NOT NULL,
    `message_id` INTEGER NOT NULL,

    PRIMARY KEY (`task_id`, `message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Organisation` ADD CONSTRAINT `User_Organisation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Organisation` ADD CONSTRAINT `User_Organisation_organisation_id_fkey` FOREIGN KEY (`organisation_id`) REFERENCES `Organisation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisation_Project` ADD CONSTRAINT `Organisation_Project_organisation_id_fkey` FOREIGN KEY (`organisation_id`) REFERENCES `Organisation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organisation_Project` ADD CONSTRAINT `Organisation_Project_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project_Task` ADD CONSTRAINT `Project_Task_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project_Task` ADD CONSTRAINT `Project_Task_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task_Message` ADD CONSTRAINT `Task_Message_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task_Message` ADD CONSTRAINT `Task_Message_message_id_fkey` FOREIGN KEY (`message_id`) REFERENCES `Message`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
