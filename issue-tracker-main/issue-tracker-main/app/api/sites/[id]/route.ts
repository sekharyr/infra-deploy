import authOptions from "@/app/auth/authOptions";
import { projectSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { any } from "zod";
import moment from "moment"
import path from "path";
import fs from "fs";
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    // Fetch the site with related information
    const site = await prisma.site.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        basicInfo: true, // Include related BasicInfo
        siteAccessInfo: true, // Include related SiteAccess
        sitePhotos: true, // Include related SitePhotos
        surveys: true, 
        project: true,   // Include related Surveys
      },
    });
  
    // Handle case where the site is not found
    if (!site) {
      return NextResponse.json({ error: "Invalid site" }, { status: 404 });
    }
  
    // Format the dates in the surveys list
    const formattedSite = {
      ...site,
      surveys: site.surveys.map((survey) => ({
        ...survey,
        date: new Date(survey.date).toLocaleDateString('en-US'), // Formatting createdAt
        // updatedAt: new Date(survey.updatedAt).toLocaleDateString('en-US'), // Formatting updatedAt
      })),
    };
  
    // Return the formatted site data
    return NextResponse.json(formattedSite);
  }

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Uncomment and adjust session check if needed
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const { siteId, siteName, region, projectId, basicInfo, siteAccessInfo, sitePhoto, survey } = body;

  const site = await prisma.site.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!site) {
    return NextResponse.json({ error: "Invalid site" }, { status: 404 });
  }

  // Prepare the data object for update
  const data: any = {};

  if (siteId) data.siteId = siteId;
  if (siteName) data.siteName = siteName;
  if (region) data.region = region;
//   data.project = { connect: { id: site.projectId } }

  // Conditionally update BasicInfo if provided
  if (basicInfo) {
    data.basicInfo = {
        upsert: {
            where: { id: basicInfo.id }, // Use the identifier for the upsert
            update: { ...basicInfo },
            create: { ...basicInfo },
          },
    };
  }

  // Conditionally update SiteAccessInfo if provided
  if (siteAccessInfo) {
    data.siteAccessInfo = {
        upsert: {
            where: { id: siteAccessInfo.id }, // Use the identifier for the upsert
            update: { ...siteAccessInfo },
            create: { ...siteAccessInfo },
          },
    };
  }

if(survey && survey.delete) {
    data.surveys = {
        delete: {
           surveyId: survey.surveyId,  // Use the surveyId to find the survey
        },
      };
} else if (survey && survey.surveyId) {
        // Handle updates
        const formattedDate = survey.date
        //   ? moment(survey.date, moment.ISO_8601, true).isValid()
            ? moment(survey.date).toISOString()
            // : null
          : null;
      
        data.surveys = {
          update: {
            where: { surveyId: survey.surveyId },  // Use the surveyId to find the survey
            data: {
              ...survey,
              date: formattedDate,  // Update with the formatted date
            },
          },
        };
} else if(survey){
        const formattedDate = survey.date
        // ? moment(survey.date, moment.ISO_8601, true).isValid()
          ? moment(survey.date).toISOString()
        //   : null
        : null;
      data.surveys = {
        create: {
            ...survey,
            date: formattedDate,  // Update with the formatted date
          
        },
      };
    }

    if(sitePhoto && sitePhoto.delete) {
      console.log(sitePhoto)
      data.sitePhotos = {
          delete: {
             id: sitePhoto.id, 
          },
          
        };
        const filePath = path.join(process.cwd(), "public/uploads", sitePhoto.name);
        console.log(filePath)

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
          NextResponse.json({ error: "File does not exist" });
        }
    
        // Delete the file
        try {
          fs.unlinkSync(filePath);
          NextResponse.json({ message: "File deleted successfully" });
        } catch (error) {
          NextResponse.json({ error: "Failed to delete file" });
        }
  } else if (sitePhoto && sitePhoto.id) {
        data.sitePhotos = {
            update: {
              where: { id: sitePhoto.id },
              data: {
                ...sitePhoto,
              },
            },
          };
        } else if(sitePhoto){
          
        data.sitePhotos = {
          create: {
              ...sitePhoto,
          },
        };
      }

  // Update the site
  const updatedSite = await prisma.site.update({
    where: { id: site.id },
    data,
    include: {
      project: true,
      basicInfo: true, // Include related BasicInfo if you need it in the response
      siteAccessInfo: true, // Include related SiteAccessInfo if you need it in the response
      sitePhotos: true, // Include related SitePhotos if you need it in the response
      surveys: true, // Include related Surveys if you need it in the response
    },
  });

  return NextResponse.json(updatedSite);
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({}, { status: 401 });

  const site = await prisma.site.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!site)
    return NextResponse.json(
      { error: "Invalid project" },
      { status: 404 }
    );

  await prisma.site.delete({
    where: { id: site.id },
  });

  return NextResponse.json({});
}
