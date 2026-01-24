import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { groups } from "@/mock/groups";
import Image from "next/image";

export default function GroupsDashboard() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Your Groups</h1>
        <p className="text-muted-foreground">See your groups and the movies you&apos;ve watched.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="overflow-hidden pt-0">
            <div className="relative h-40 w-full">
              <Image width={500} height={500} src={group.image} alt={group.name} className="h-full w-full object-cover" />
            </div>

            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {group.name}
                <Badge variant="secondary">{group.members} Members</Badge>
              </CardTitle>

              <CardDescription>⭐ Average: {group.ratingAverage}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Separator />

              <h3 className="text-sm font-semibold">Movies</h3>

              <ScrollArea className="h-48 pr-2">
                <div className="space-y-3">
                  {group.movies.map((movie) => (
                    <div key={movie.id} className="rounded-md border p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{movie.title}</p>
                        <Badge variant="outline">{movie.assessment}</Badge>
                      </div>

                      <p className="text-xs text-muted-foreground">{movie.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
