import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function GroupList({ userId }: { userId: string }) {
  const groups = await prisma.group.findMany({
    where: {
      members: {
        some: {
          userId: userId
        },
      },
    },
    include: {
      members: true,
    },
  });

  return (
    <>
      {groups.map((group) => (
        <Card key={group.id} className="border flex py-0 flex-col w-full min-w-3xs">
          <div className="relative h-40 w-full">
            <Image width={500} height={500} src="/group.png" alt={group.name} className="h-full w-full object-cover" />
          </div>

          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {group.name}
              <Badge variant="secondary">{group.members.length} Members</Badge>
            </CardTitle>

            {/* <CardDescription>⭐ Average: 11</CardDescription> */}
          </CardHeader>

          <CardContent className="space-y-4">
            <Separator />

            <h3 className="text-sm font-semibold">Movies</h3>

            <ScrollArea className="h-48 pr-2">
              <div className="space-y-3">
                <div className="rounded-md border p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Teste</p>
                    <Badge variant="outline">Teste</Badge>
                  </div>

                  <p className="text-xs text-muted-foreground">Teste</p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
