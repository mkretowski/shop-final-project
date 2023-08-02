/*
  Warnings:

  - The primary key for the `productonorders` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `productonorders` DROP PRIMARY KEY,
    ADD COLUMN `size` VARCHAR(191) NOT NULL DEFAULT '',
    ADD PRIMARY KEY (`orderId`, `productId`, `size`);
