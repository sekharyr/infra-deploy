import authOptions from "@/app/auth/authOptions";
import { projectSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });
  
  
    const project = await prisma.project.findUnique({
      where: { id: parseInt(params.id) }, include: {
        sites: true,    // Include related sites
        users: true,    // Include related users
      },
    });
    if (!project)
      return NextResponse.json(
        { error: "Invalid project" },
        { status: 404 }
      );
    return NextResponse.json(project);
  }

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = projectSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { name, description } = body;

  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!project)
    return NextResponse.json(
      { error: "Invalid project" },
      { status: 404 }
    );

  const updatedproject = await prisma.project.update({
    where: { id: project.id },
    data: {
      name,
      description,
    },
  });
  return NextResponse.json(updatedproject);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({}, { status: 401 });

  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!project)
    return NextResponse.json(
      { error: "Invalid project" },
      { status: 404 }
    );

  await prisma.project.delete({
    where: { id: project.id },
  });

  return NextResponse.json({});
}
