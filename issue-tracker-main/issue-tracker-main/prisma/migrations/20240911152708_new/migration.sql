/*
  Warnings:

  - You are about to drop the column `surveyorId` on the `Survey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Survey` DROP COLUMN `surveyorId`,
    ADD COLUMN `surveyorName` VARCHAR(191) NULL,
    MODIFY `date` DATETIME(3) NULL,
    MODIFY `phoneNo` VARCHAR(191) NULL;
