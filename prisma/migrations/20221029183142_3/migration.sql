/*
  Warnings:

  - You are about to drop the `productoncategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productoncategory` DROP FOREIGN KEY `productOnCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `productoncategory` DROP FOREIGN KEY `productOnCategory_productId_fkey`;

-- DropTable
DROP TABLE `productoncategory`;

-- CreateTable
CREATE TABLE `_categoryToproduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_categoryToproduct_AB_unique`(`A`, `B`),
    INDEX `_categoryToproduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_categoryToproduct` ADD CONSTRAINT `_categoryToproduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_categoryToproduct` ADD CONSTRAINT `_categoryToproduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
