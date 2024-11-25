/*
  Warnings:

  - The primary key for the `Site` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[siteId]` on the table `Site` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Site` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `siteId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `SitePhoto` MODIFY `siteId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Survey` MODIFY `siteId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Site_siteId_key` ON `Site`(`siteId`);
