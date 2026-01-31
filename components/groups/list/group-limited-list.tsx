import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import InviteGroupDialog from "../invite/invite-group-dialog";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
      movies: true,
    },
  });

  const lastGroups = groups.slice(-3).reverse();

  const typeStyles = {
    COUPLE: "bg-pink-500 hover:bg-pink-600",
    FRIENDS: "bg-green-500 hover:bg-green-600",
    FAMILY: "bg-blue-500 hover:bg-blue-600",
  };
  return (
    <>
      {lastGroups.map((group) => (
        <Card key={group.id} className="border flex flex-row py-0">
          <div className="h-55 w-1/2 rounded-l-md overflow-hidden">
            <Image width={500} height={500} src="/group.png" alt={group.name} className="w-full h-full object-cover" />
          </div>
          <div className="py-5 flex flex-col w-full gap-5">
            <CardHeader>
              <CardTitle className="text-md font-semibold justify-between flex items-center gap-2">
                {group.name}
                <Badge className={typeStyles[group.type]}>{group.type}</Badge>
              </CardTitle>
              <CardDescription>{group.members.length} members</CardDescription>
              <CardContent className="mt-2 px-0">
                <h2>Movies watched: {group.movies.length}</h2>
              </CardContent>
            </CardHeader>
            <CardFooter className="flex gap-2 md:flex-row flex-col">
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
