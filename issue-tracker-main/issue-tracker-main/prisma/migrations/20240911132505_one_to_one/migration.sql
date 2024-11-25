/*
  Warnings:

  - A unique constraint covering the columns `[basicInfoId]` on the table `Site` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siteAccessInfoId]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Site_basicInfoId_key` ON `Site`(`basicInfoId`);

-- CreateIndex
CREATE UNIQUE INDEX `Site_siteAccessInfoId_key` ON `Site`(`siteAccessInfoId`);
