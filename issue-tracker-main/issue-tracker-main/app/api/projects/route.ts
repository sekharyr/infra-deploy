// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { projectSchema } from '../../validationSchemas';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function GET() {
//   const session = await getServerSession(authOptions);
//   if (!session)
//     return NextResponse.json({}, { status: 401 });
  try {
    const projects = await prisma.project.findMany({
        include: {
          sites: true,    // Include related sites
          users: true,    // Include related users
        },
      });
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching projects', details: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (!session)
//     return NextResponse.json({}, { status: 401 });
  try {
    const body = await request.json();
    const validation = projectSchema.safeParse(body); // Validate the input
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });
    const project = await prisma.project.create({
        data: { name: body.name, description: body.description },include: {
            sites: true,    // Include related sites
            users: true,    // Include related users
          },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error fetching projects', details: error.message }, { status: 500 });
  }
}
