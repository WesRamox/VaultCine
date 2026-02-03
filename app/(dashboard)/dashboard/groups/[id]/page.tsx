import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserPlus, Film, Star, TrendingUp, Hash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import InviteGroupForm from "@/components/groups/invite/invite-group-form";
import RateMovieDialog from "@/components/groups/movies/rate-movie-dialog";
import DeleteGroupButton from "@/components/groups/delete/delete-group-button";

interface GroupPageProps {
  params: Promise<{ id: string }>;
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) redirect("/login");

  const group = await prisma.group.findFirst({
    where: { id, members: { some: { userId: session.user.id } } },
    include: {
      members: {
        include: { user: true },
      },
      movies: true,
    },
  });

  if (!group) return notFound();

  const isOwner = group.ownerId === session.user.id;

  const totalRating = group.movies.reduce((acc, movie) => acc + (movie.rating ?? 0), 0);
  const groupAverageRating = group.movies.length > 0 ? totalRating / group.movies.length : 0;

  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-primary">
            {group.name} <span className="text-muted-foreground/50 text-2xl">/ Catalog</span>
          </h1>
          <p className="text-muted-foreground font-medium">{group.description}</p>
        </div>

        <div className="flex gap-3">
          <RateMovieDialog groupId={group.id} />
          {isOwner && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="font-semibold border-2">
                  <UserPlus className="w-4 h-4 mr-2" /> Invite
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Member</DialogTitle>
                </DialogHeader>
                <InviteGroupForm groupId={group.id} />
              </DialogContent>
            </Dialog>
          )}
          {isOwner && <DeleteGroupButton groupId={group.id} />}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Hash size={24} className="opacity-50" />
              <span className="text-3xl font-black">{group.movies.length}</span>
            </div>
            <p className="text-xs font-bold uppercase mt-2 opacity-80">Total Movies Watched</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-yellow-500">
              <Star size={24} className="fill-current" />
              <span className="text-3xl font-black text-foreground">{groupAverageRating.toFixed(1)}</span>
            </div>
            <p className="text-xs text-muted-foreground font-bold uppercase mt-2">Group Avg Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-blue-500">
              <TrendingUp size={24} />
              <span className="text-3xl font-black text-foreground">{group.members.length}</span>
            </div>
            <p className="text-xs text-muted-foreground font-bold uppercase mt-2">Active Critics</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9">
          <Card className="border-2 shadow-none min-h-100">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <Film size={16} /> Movie Log
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-2 text-center">
              {group.movies.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 text-center">
                  <div className="border-4 border-dashed rounded-full p-8 mb-4">
                    <Film size={48} className="text-muted-foreground/20" />
                  </div>
                  <h3 className="text-xl font-bold italic uppercase tracking-tighter">The Archive is Empty</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto mt-2 text-sm font-medium">No movies have been logged yet. Start building your cinematic history.</p>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  {group.movies.map((movie, index) => (
                    <div key={movie.id} className={`group flex items-center justify-between p-6 transition-colors hover:bg-muted/30 ${index !== group.movies.length - 1 ? "border-b" : ""}`}>
                      <div className="flex items-center gap-6 min-w-0">
                        <span className="text-muted-foreground/30 font-black text-xl italic w-8">{(index + 1).toString().padStart(2, "0")}</span>
                        <div className="space-y-1 text-start">
                          <h4 className="font-black uppercase italic tracking-tighter text-lg leading-none group-hover:text-primary transition-colors truncate">{movie.title}</h4>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Entry secured in group archive</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 shrink-0">
                        <div className="hidden md:flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className={`${i < (movie.rating || 0) ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                          ))}
                        </div>

                        <div className="bg-primary text-primary-foreground font-black italic px-4 py-2 rounded-lg text-lg min-w-15 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] group-hover:shadow-primary/20 transition-all">
                          {movie.rating?.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <aside className="lg:col-span-3 space-y-6">
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Board Members</h4>
            <div className="space-y-4">
              {group.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-background ring-2 ring-muted shrink-0">
                    <AvatarImage src={member.user.image || ""} />
                    <AvatarFallback>{member.user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate leading-none mb-1">{member.user.name}</p>
                    {group.ownerId === member.userId ? (
                      <span className="text-[10px] font-black text-primary uppercase">Founder</span>
                    ) : (
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Critic</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="bg-muted p-4 rounded-xl">
            <p className="text-[10px] font-black uppercase mb-2">Group Insights</p>
            <p className="text-xs text-muted-foreground leading-relaxed">...</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
