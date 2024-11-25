-- AlterTable
ALTER TABLE `BasicInfo` MODIFY `sharingSite` BOOLEAN NULL,
    MODIFY `siteOwner` VARCHAR(191) NULL,
    MODIFY `siteType` VARCHAR(191) NULL,
    MODIFY `latitude` DOUBLE NULL,
    MODIFY `longitude` DOUBLE NULL,
    MODIFY `towerType` VARCHAR(191) NULL,
    MODIFY `towerHeight` DOUBLE NULL,
    MODIFY `detailedAddress` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SiteAccess` MODIFY `is24hrs` BOOLEAN NULL,
    MODIFY `contactPerson` VARCHAR(191) NULL,
    MODIFY `siteRegion` VARCHAR(191) NULL,
    MODIFY `phoneNo` VARCHAR(191) NULL,
    MODIFY `siteOwnership` VARCHAR(191) NULL,
    MODIFY `liftAvailability` BOOLEAN NULL,
    MODIFY `needKey` BOOLEAN NULL,
    MODIFY `accessRoad` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SitePhoto` MODIFY `siteId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Survey` MODIFY `surveyorType` VARCHAR(191) NULL,
    MODIFY `siteId` VARCHAR(191) NULL;
