import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, Film, ChevronRight } from "lucide-react";

export default async function GroupList({ userId }: { userId: string }) {
  const groups = await prisma.group.findMany({
    where: {
      members: {
        some: { userId: userId },
      },
    },
    include: {
      members: {
        include: { user: true },
      },
      _count: {
        select: { members: true },
      },
    },
  });

  const typeStyles = {
    COUPLE: "bg-pink-500/100 text-white border-pink-200 hover:bg-pink-500/20",
    FRIENDS: "bg-green-500/100 text-white border-green-200 hover:bg-green-500/20",
    FAMILY: "bg-blue-500/100 text-white border-blue-200 hover:bg-blue-500/20",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <Link key={group.id} href={`/dashboard/groups/${group.id}`} className="group">
          <Card className="overflow-hidden transition-all pt-0 duration-300 group-hover:ring-2 group-hover:ring-primary group-hover:shadow-xl h-full flex flex-col">
            <div className="relative h-32 w-full overflow-hidden">
              <Image fill src="/group.png" alt={group.name} className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <Badge className={`absolute top-3 right-3 border font-bold ${typeStyles[group.type as keyof typeof typeStyles]}`}>{group.type}</Badge>
            </div>

            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl font-bold flex items-center justify-between">
                {group.name}
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span className="font-semibold text-foreground">{group._count.members}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Film className="h-4 w-4" />
                  <span className="font-semibold text-foreground">0</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">Status</h4>
                <div className="rounded-lg bg-muted/40 p-3 border border-dashed">
                  <p className="text-xs italic text-muted-foreground text-center">No movies logged yet</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex -space-x-2 overflow-hidden">
                  {group.members.slice(0, 4).map((member) => (
                    <div key={member.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted overflow-hidden relative">
                      {member.user.image ? (
                        <Image src={member.user.image} alt="" fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] font-bold">{member.user.name?.[0]}</div>
                      )}
                    </div>
                  ))}
                  {group.members.length > 4 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-background bg-secondary text-[10px] font-bold">+{group.members.length - 4}</div>
                  )}
                </div>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">View Catalog</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
