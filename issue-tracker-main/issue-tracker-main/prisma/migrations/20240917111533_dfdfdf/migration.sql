/*
  Warnings:

  - You are about to drop the column `accessIn` on the `SitePhoto` table. All the data in the column will be lost.
  - You are about to drop the column `accessOut` on the `SitePhoto` table. All the data in the column will be lost.
  - You are about to drop the column `buildingFloor` on the `SitePhoto` table. All the data in the column will be lost.
  - You are about to drop the column `constructionStatus` on the `SitePhoto` table. All the data in the column will be lost.
  - You are about to drop the column `mainAccessRoad` on the `SitePhoto` table. All the data in the column will be lost.
  - You are about to drop the column `siteCoordinates` on the `SitePhoto` table. All the data in the column will be lost.
  - You are about to drop the column `siteLocation` on the `SitePhoto` table. All the data in the column will be lost.
  - You are about to drop the column `tower1Location` on the `SitePhoto` table. All the data in the column will be lost.
  - You are about to drop the column `tower2Location` on the `SitePhoto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `SitePhoto` DROP COLUMN `accessIn`,
    DROP COLUMN `accessOut`,
    DROP COLUMN `buildingFloor`,
    DROP COLUMN `constructionStatus`,
    DROP COLUMN `mainAccessRoad`,
    DROP COLUMN `siteCoordinates`,
    DROP COLUMN `siteLocation`,
    DROP COLUMN `tower1Location`,
    DROP COLUMN `tower2Location`,
    ADD COLUMN `label` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `url` VARCHAR(191) NULL;
