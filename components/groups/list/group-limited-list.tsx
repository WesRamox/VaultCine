import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import InviteGroupDialog from "../invite/invite-group-dialog";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface GroupLimitedListProps {
  session: {
    user: {
      id: string;
    };
  };
}

export default async function GroupLimitedList({ session }: GroupLimitedListProps) {
  const groups = await prisma.group.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      members: true,
    },
  });

  const lastGroups = groups.slice(-3).reverse();
  return (
    <>
      {lastGroups.map((group) => (
        <Card key={group.id} className="border flex flex-row py-0">
          <div className="h-55 w-1/2 rounded-l-md overflow-hidden">
            <Image width={500} height={500} src="/group.png" alt={group.name} className="w-full h-full object-cover" />
          </div>
          <div className="py-5 flex flex-col gap-5">
            <CardHeader>
              <CardTitle className="text-md font-semibold">{group.name}</CardTitle>
              <CardDescription>{group.members.length} members</CardDescription>
              <CardContent className="mt-2 px-0">
                <h2>Movies watched: 0</h2>
                <p className="flex gap-1 items-center">⭐ 5 Average</p>
              </CardContent>
            </CardHeader>
            <CardFooter className="flex gap-2">
              <Button asChild>
                <Link className="mr-2" href={`/dashboard/groups/${group.id}`}>
                  View Group
                </Link>
              </Button>
              <InviteGroupDialog groupId={group.id} />
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
}
