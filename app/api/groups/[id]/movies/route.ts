import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"; 

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const session = await getServerSession(authOptions);

    const { id } = await context.params;

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, rating } = await req.json();

    const isMember = await prisma.groupMember.findFirst({
      where: {
        groupId: id,
        userId: session.user.id,
      },
    });

    if (!isMember) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        rating: Number(rating),
        groupId: id,
      },
    });

    return NextResponse.json(movie);
  } catch (error) {
    console.error("[MOVIE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}