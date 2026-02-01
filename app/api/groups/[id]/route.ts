import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  return NextResponse.json({ message: `Searching group ${id}` });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const { id } = params;

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const group = await prisma.group.findUnique({
      where: { id: id },
      select: { ownerId: true }
    });

    if (!group) {
      return new NextResponse("Group not found", { status: 404 });
    }

    if (group.ownerId !== session.user.id) {
      return new NextResponse("Forbidden: Only the owner can delete this group", { status: 403 });
    }

    await prisma.group.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Group archived and deleted successfully" });
  } catch (error) {
    console.error("[GROUP_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}