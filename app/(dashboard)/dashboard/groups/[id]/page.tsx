import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface GroupPageProps {
  params: {
    id: string;
  };
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const group = await prisma.group.findFirst({
    where: {
      id: id,
      OR: [{ ownerId: session.user.id }, { members: { some: { userId: session.user.id } } }],
    },
    include: {
      members: true,
    },
  });

  if (!group) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Group ID: {id}</h1>
      <p className="text-muted-foreground">This is the page for group with ID {id}.</p>
      <pre className="mt-4 p-4 rounded">{JSON.stringify(group, null, 2)}</pre>
    </div>
  );
}
