import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GroupsDashboard() {
  const groups = [
    {
      id: 1,
      name: "Sci-Fi Enthusiasts",
      members: 12,
      image: "https://files.tecnoblog.net/wp-content/uploads/2021/04/Qual-a-ordem-cronologica-dos-filmes-do-Batman-Deny-Freeman-Flickr.jpg",
      ratingAverage: 4.5,
      movies: [
        {
          id: 1,
          title: "Inception",
          description: "A mind-bending thriller by Christopher Nolan.",
          assessment: 4.8,
        },
        {
          id: 2,
          title: "The Matrix",
          description: "A sci-fi classic that questions reality.",
          assessment: 4.7,
        },
        {
          id: 3,
          title: "Interstellar",
          description: "A journey through space and time.",
          assessment: 4.6,
        },
      ],
    },
    {
      id: 2,
      name: "Comedy Lovers",
      members: 8,
      image:
        "https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABU7DafMIguftQqa3etO7FgnYfFCTrM5WiFBrA6UX_m9EzNCe2-WS-f7_V6HjXWPo7uv6oSnqbnZ_Im-Dy9MQNdZ2VdvTSCGwzKaU.jpg?r=3d1",
      ratingAverage: 4.5,
      movies: [
        {
          id: 4,
          title: "Superbad",
          description: "A hilarious coming-of-age comedy.",
          assessment: 4.5,
        },
        {
          id: 5,
          title: "The Hangover",
          description: "A wild adventure in Las Vegas.",
          assessment: 4.4,
        },
        {
          id: 6,
          title: "Step Brothers",
          description: "A comedy about unlikely friendships.",
          assessment: 4.3,
        },
      ],
    },
  ];

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
              <img src={group.image} alt={group.name} className="h-full w-full object-cover" />
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
