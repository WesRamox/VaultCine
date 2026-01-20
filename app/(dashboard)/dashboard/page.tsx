"use client";

import CreateGroupDialog from "@/components/groups/create-group-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

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
    <Card className="w-full flex bg-linear-to-br from-background to-muted p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold pt-6">Welcome back, {session?.user?.name}!</CardTitle>
      </CardHeader>
      <Card>
        <CardHeader className="text-lg font-medium">
          <CardTitle>My Groups</CardTitle>
          <CardDescription>Manage the groups you&apos;ve created or are part of to watch movies together.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {groups.map((group) => (
            <Card key={group.id} className="border flex flex-row py-0">
              <div className="h-55 w-1/2 object-cover rounded-l-md overflow-hidden">
                <img src={group.image} alt={group.name} className="w-full h-full" />
              </div>
              <div className="py-5 flex flex-col gap-5">
                <CardHeader>
                  <CardTitle className="text-md font-semibold">{group.name}</CardTitle>
                  <CardDescription>{group.members} members</CardDescription>
                  <CardContent className="mt-2 px-0">
                    <h2>Movies watched: {group.movies.length}</h2>
                    <p className="flex gap-1 items-center">⭐ {group.ratingAverage} Average</p>
                  </CardContent>
                </CardHeader>
                <CardFooter className="flex gap-2">
                  <Button>View Group</Button>
                  <Button variant={"outline"}>Invite to Group</Button>
                </CardFooter>
              </div>
            </Card>
          ))}
          <CreateGroupDialog />
        </CardContent>
      </Card>
    </Card>
  );
}
