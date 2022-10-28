/*
  Warnings:

  - A unique constraint covering the columns `[imageUrl]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `product_imageUrl_key` ON `product`(`imageUrl`);
