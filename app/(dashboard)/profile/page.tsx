import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Crown, Mail, ShieldCheck, ChevronRight, LayoutGrid } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const ownedGroups = await prisma.group.findMany({
    where: { ownerId: session.user.id },
    include: {
      _count: {
        select: { members: true },
      },
    },
  });

  const typeStyles = {
    COUPLE: "bg-pink-500/10 text-pink-600 border-pink-200",
    FRIENDS: "bg-green-500/10 text-green-600 border-green-200",
    FAMILY: "bg-blue-500/10 text-blue-600 border-blue-200",
  };

  const highResImage = session.user.image?.replace("=s96-c", "=s300-c");

  return (
    <div className="container max-w-5xl py-10 space-y-10 mx-auto">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-muted/50 to-background p-8 md:p-12">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-25 blur transition duration-1000 group-hover:opacity-50" />
            <Image className="relative rounded-full border-4 border-background object-cover" src={highResImage || ""} alt="Profile" width={140} height={140} />
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="text-4xl font-black tracking-tight">{session.user.name}</h1>
                <Badge className="bg-blue-500 text-white border-none gap-1 py-1">
                  <ShieldCheck className="h-3 w-3" /> Premium
                </Badge>
              </div>
              <p className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground font-medium">
                <Mail className="h-4 w-4" /> {session.user.email}
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm pt-2">
              <div className="bg-background/80 px-4 py-2 rounded-2xl border shadow-sm">
                <span className="font-bold text-lg block">{ownedGroups.length}</span>
                <span className="text-muted-foreground text-[10px] uppercase font-black">Groups Owned</span>
              </div>
              <div className="bg-background/80 px-4 py-2 rounded-2xl border shadow-sm">
                <span className="font-bold text-lg block">0</span>
                <span className="text-muted-foreground text-[10px] uppercase font-black">Ratings Given</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" /> Administrative Groups
              </CardTitle>
              <CardDescription>Groups created and managed by you.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {ownedGroups.length > 0 ? (
              <div className="grid gap-3">
                {ownedGroups.map((group) => (
                  <Link
                    key={group.id}
                    href={`/dashboard/groups/${group.id}`}
                    className="group flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <LayoutGrid className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold leading-none mb-1 group-hover:text-primary transition-colors">{group.name}</p>
                        <p className="text-xs text-muted-foreground">{group._count.members} Members</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={typeStyles[group.type as keyof typeof typeStyles]}>
                        {group.type}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-2xl">
                <p className="text-muted-foreground text-sm italic">You dont own any groups yet.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Account Safety</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-xs leading-relaxed text-muted-foreground">
              Your data is synced with **Google Identity Services**. You can manage your preferences or request data deletion by contacting our support.
            </div>
            <Separator />
            <div className="text-[10px] font-mono bg-muted p-2 rounded truncate text-muted-foreground uppercase">UID: {session.user.id}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
