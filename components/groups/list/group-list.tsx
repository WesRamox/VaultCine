import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, Film, ArrowRight } from "lucide-react";
import DeleteGroupButton from "../delete/delete-group-button";

export default async function GroupList({ userId }: { userId: string }) {
  const groups = await prisma.group.findMany({
    where: {
      members: { some: { userId: userId } },
    },
    include: {
      members: { include: { user: true } },
      _count: { select: { members: true } },
      movies: true,
    },
  });

  const typeStyles = {
    COUPLE: "bg-pink-500 text-white",
    FRIENDS: "bg-green-500 text-white",
    FAMILY: "bg-blue-500 text-white",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.length === 0 ? (
        <p className="text-muted-foreground">You are not a member of any groups yet.</p>
      ) : (
        <>
          {groups.map((group) => (
            <Card key={group.id} className="overflow-hidden transition-all pt-0 duration-300 hover:shadow-xl h-full flex flex-col border-2">
              <div className="relative h-32 w-full overflow-hidden">
                <Image fill src="/group.png" alt={group.name} className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <Badge className={`absolute top-3 right-3 border-none font-bold ${typeStyles[group.type as keyof typeof typeStyles]}`}>{group.type}</Badge>

                {group.ownerId === userId && (
                  <div className="absolute top-3 left-3">
                    <DeleteGroupButton groupId={group.id} />
                  </div>
                )}
              </div>

              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl font-black uppercase italic tracking-tighter">{group.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{group._count.members}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Film className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{group.movies.length}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">Last entry</h4>
                  <div className="rounded-lg bg-muted/40 p-3 border border-dashed border-muted-foreground/20">
                    <p className="text-xs italic font-medium text-muted-foreground truncate">{group.movies.length === 0 ? "Empty Archive" : group.movies[group.movies.length - 1].title}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 4).map((member) => (
                      <div key={member.id} className="h-8 w-8 rounded-full ring-2 ring-background bg-muted overflow-hidden relative border border-background">
                        {member.user.image ? (
                          <Image src={member.user.image} alt="" fill className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] font-bold">{member.user.name?.[0]}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <Link href={`/dashboard/groups/${group.id}`} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:underline group">
                    View Catalog <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}
