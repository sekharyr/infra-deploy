-- CreateTable
CREATE TABLE `Site` (
    `siteId` INTEGER NOT NULL AUTO_INCREMENT,
    `siteName` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `projectId` INTEGER NOT NULL,
    `basicInfoId` INTEGER NOT NULL,
    `siteAccessInfoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`siteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BasicInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sharingSite` BOOLEAN NOT NULL,
    `siteOwner` VARCHAR(191) NOT NULL,
    `siteType` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `towerType` VARCHAR(191) NOT NULL,
    `towerHeight` DOUBLE NOT NULL,
    `city` VARCHAR(191) NULL,
    `buildingHeight` DOUBLE NULL,
    `village` VARCHAR(191) NULL,
    `siteArea` DOUBLE NULL,
    `typeOfPremises` VARCHAR(191) NULL,
    `detailedAddress` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteAccess` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is24hrs` BOOLEAN NOT NULL,
    `contactPerson` VARCHAR(191) NOT NULL,
    `siteRegion` VARCHAR(191) NOT NULL,
    `phoneNo` VARCHAR(191) NOT NULL,
    `siteOwnership` VARCHAR(191) NOT NULL,
    `liftAvailability` BOOLEAN NOT NULL,
    `needKey` BOOLEAN NOT NULL,
    `accessRoad` VARCHAR(191) NOT NULL,
    `stairWidth` DOUBLE NULL,
    `doorSize` DOUBLE NULL,
    `possibleDifficulties` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SitePhoto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siteCoordinates` VARCHAR(191) NULL,
    `siteLocation` VARCHAR(191) NULL,
    `buildingFloor` VARCHAR(191) NULL,
    `mainAccessRoad` VARCHAR(191) NULL,
    `accessIn` VARCHAR(191) NULL,
    `accessOut` VARCHAR(191) NULL,
    `tower1Location` VARCHAR(191) NULL,
    `tower2Location` VARCHAR(191) NULL,
    `constructionStatus` VARCHAR(191) NULL,
    `siteId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Survey` (
    `surveyId` INTEGER NOT NULL AUTO_INCREMENT,
    `surveyorId` VARCHAR(191) NOT NULL,
    `surveyorType` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `phoneNo` VARCHAR(191) NOT NULL,
    `remark` VARCHAR(191) NULL,
    `siteId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`surveyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Project_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectToUser` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProjectToUser_AB_unique`(`A`, `B`),
    INDEX `_ProjectToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
