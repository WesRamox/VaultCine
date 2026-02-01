import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import InviteGroupDialog from "../invite/invite-group-dialog";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Users, Film, Eye } from "lucide-react";

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
        <Card key={group.id} className="border flex flex-col lg:flex-col xl:flex-row py-0 overflow-hidden">
          <div className="h-55 w-full min-w-20 overflow-hidden">
            <Image width={500} height={500} src="/group.png" alt={group.name} className="w-full h-full min-w-20 object-cover" />
          </div>
          <div className="py-5 flex flex-col w-full gap-5">
            <CardHeader>
              <CardTitle className="text-md font-semibold justify-between flex items-center gap-2">
                {group.name}
                <Badge className={typeStyles[group.type as keyof typeof typeStyles]}>{group.type}</Badge>
              </CardTitle>
              <CardDescription className="flex items-center gap-1.5">
                <Users size={14} /> {group.members.length} members
              </CardDescription>
              <CardContent className="mt-2 px-0">
                <h2 className="flex items-center gap-1.5 text-sm font-medium">
                  <Film size={14} /> Movies watched: {group.movies.length}
                </h2>
              </CardContent>
            </CardHeader>
            <CardFooter className="flex gap-2 flex-col sm:flex-col lg:flex-row">
              <Button asChild className="gap-2 w-full lg:w-auto justify-center">
                <Link href={`/dashboard/groups/${group.id}`}>
                  <Eye size={16} /> View Group
                </Link>
              </Button>
              {group.ownerId == session.user.id && <InviteGroupDialog groupId={group.id} />}
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
}
