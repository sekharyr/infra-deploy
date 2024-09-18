import { NextRequest,NextResponse } from 'next/server';
import prisma from '@/prisma/client'; // Adjust the import path based on your project structure

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { siteId, siteName, region, projectId, basicInfo, siteAccess, sitePhotos, surveys } = body;
  
      // Mandatory fields check
      if (!siteId || !siteName || !region || !projectId) {
        return NextResponse.json({ error: "Required fields: siteId, siteName, region, projectId" }, { status: 400 });
      }
  
      // Prepare data object
      const data: any = {
        siteId,
        siteName,
        region,
        project: { connect: { id: projectId } }
      };
  
      // Conditionally add BasicInfo if provided
      if (basicInfo) {
        data.basicInfo = {
          create: {
            sharingSite: basicInfo.sharingSite,
            siteOwner: basicInfo.siteOwner,
            siteType: basicInfo.siteType,
            latitude: basicInfo.latitude,
            longitude: basicInfo.longitude,
            towerType: basicInfo.towerType,
            towerHeight: basicInfo.towerHeight,
            city: basicInfo.city,
            buildingHeight: basicInfo.buildingHeight,
            village: basicInfo.village,
            siteArea: basicInfo.siteArea,
            typeOfPremises: basicInfo.typeOfPremises,
            detailedAddress: basicInfo.detailedAddress,
          },
        };
      }
  
      // Conditionally add SiteAccessInfo if provided
      if (siteAccess) {
        data.siteAccessInfo = {
          create: {
            is24hrs: siteAccess.is24hrs,
            contactPerson: siteAccess.contactPerson,
            siteRegion: siteAccess.siteRegion,
            phoneNo: siteAccess.phoneNo,
            siteOwnership: siteAccess.siteOwnership,
            liftAvailability: siteAccess.liftAvailability,
            needKey: siteAccess.needKey,
            accessRoad: siteAccess.accessRoad,
            stairWidth: siteAccess.stairWidth,
            doorSize: siteAccess.doorSize,
            possibleDifficulties: siteAccess.possibleDifficulties,
          },
        };
      }
  
      // Conditionally add SitePhotos if provided
      if (sitePhotos && sitePhotos.length > 0) {
        data.sitePhotos = {
          create: sitePhotos
        };
      }
  
      // Conditionally add Surveys if provided
      if (surveys && surveys.length > 0) {
        data.surveys = {
          create: surveys
        };
      }
  
      // Create the site
      const site = await prisma.site.create({
        data,
        include: {
          basicInfo: true, // Include related BasicInfo
          siteAccessInfo: true, // Include related SiteAccess
          sitePhotos: true, // Include related SitePhotos
          surveys: true, // Include related Surveys
          project: true,
        },
      });
  
      return NextResponse.json(site, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: 'Error creating site', details: error.message }, { status: 500 });
    }
  }
  

export async function GET(req: NextRequest) {
    //   const session = await getServerSession(authOptions);
    //   if (!session)
    //     return NextResponse.json({}, { status: 401 });
      try {
        const url = new URL(req.url);
    const projectId = url.searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
    }
    const projectIdNumber = parseInt(projectId, 10);

    if (isNaN(projectIdNumber)) {
      return NextResponse.json({ error: 'Invalid projectId' }, { status: 400 });
    }
        const sites = await prisma.site.findMany({
            where: { projectId: projectIdNumber },
            include: {
                basicInfo: true, // Include related BasicInfo
                siteAccessInfo: true, // Include related SiteAccess
                sitePhotos: true, // Include related SitePhotos
                surveys: true,
                project: true,
              },
          });
        return NextResponse.json(sites);
      } catch (error: any) {
        return NextResponse.json({ error: 'Error fetching sites', details: error.message }, { status: 500 });
      }
    }
