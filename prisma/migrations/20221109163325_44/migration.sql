/*
  Warnings:

  - You are about to drop the `_categorytoproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ordertoproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_categoryToproduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_categoryToproduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_orderToproduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_orderToproduct_B_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE `_categorytoproduct`;

-- DropTable
DROP TABLE `_ordertoproduct`;

-- DropTable
DROP TABLE `product`;

-- CreateTable
CREATE TABLE `author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `prix` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `book_name_key`(`name`),
    UNIQUE INDEX `book_imageUrl_key`(`imageUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_authorTobook` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_authorTobook_AB_unique`(`A`, `B`),
    INDEX `_authorTobook_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_bookTocategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_bookTocategory_AB_unique`(`A`, `B`),
    INDEX `_bookTocategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_bookToorder` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_bookToorder_AB_unique`(`A`, `B`),
    INDEX `_bookToorder_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_authorTobook` ADD CONSTRAINT `_authorTobook_A_fkey` FOREIGN KEY (`A`) REFERENCES `author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_authorTobook` ADD CONSTRAINT `_authorTobook_B_fkey` FOREIGN KEY (`B`) REFERENCES `book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bookTocategory` ADD CONSTRAINT `_bookTocategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bookTocategory` ADD CONSTRAINT `_bookTocategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bookToorder` ADD CONSTRAINT `_bookToorder_A_fkey` FOREIGN KEY (`A`) REFERENCES `book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bookToorder` ADD CONSTRAINT `_bookToorder_B_fkey` FOREIGN KEY (`B`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
