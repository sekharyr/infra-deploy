import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255)
    .optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});

// Define validation schema for `Project` model
export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
});

// Define validation schema for `Site` model
export const SiteSchema = z.object({
  siteId: z.number().int(),
  siteName: z.string().min(1, "Site name is required"),
  region: z.string().min(1, "Region is required"),
  photo: z.string().optional(),
  projectId: z.number().int(),
  basicInfoId: z.number().int().optional(),
  siteAccessInfoId: z.number().int().optional(),
});

// Define validation schema for `BasicInfo` model
export const BasicInfoSchema = z.object({
  sharingSite: z.boolean(),
  siteOwner: z.string().min(1, "Site owner is required"),
  siteType: z.string().min(1, "Site type is required"),
  latitude: z.number(),
  longitude: z.number(),
  towerType: z.string().min(1, "Tower type is required"),
  towerHeight: z.number(),
  city: z.string().optional(),
  buildingHeight: z.number().optional(),
  village: z.string().optional(),
  siteArea: z.number().optional(),
  typeOfPremises: z.string().optional(),
  detailedAddress: z.string().min(1, "Detailed address is required"),
});

// Define validation schema for `SiteAccess` model
export const SiteAccessSchema = z.object({
  is24hrs: z.boolean(),
  contactPerson: z.string().min(1, "Contact person is required"),
  siteRegion: z.string().min(1, "Site region is required"),
  phoneNo: z.string().min(1, "Phone number is required"),
  siteOwnership: z.string().min(1, "Site ownership is required"),
  liftAvailability: z.boolean(),
  needKey: z.boolean(),
  accessRoad: z.string().min(1, "Access road details are required"),
  stairWidth: z.number().optional(),
  doorSize: z.number().optional(),
  possibleDifficulties: z.string().optional(),
});

// Define validation schema for `SitePhoto` model
export const SitePhotoSchema = z.object({
  siteCoordinates: z.string().optional(),
  siteLocation: z.string().optional(),
  buildingFloor: z.string().optional(),
  mainAccessRoad: z.string().optional(),
  accessIn: z.string().optional(),
  accessOut: z.string().optional(),
  tower1Location: z.string().optional(),
  tower2Location: z.string().optional(),
  constructionStatus: z.string().optional(),
});

// Define validation schema for `Survey` model
export const SurveySchema = z.object({
  surveyorId: z.string().uuid(), // Assuming cuid() generates UUID-like strings
  surveyorType: z.string().min(1, "Surveyor type is required"),
  date: z.date(),
  phoneNo: z.string().min(1, "Phone number is required"),
  remark: z.string().optional(),
});

