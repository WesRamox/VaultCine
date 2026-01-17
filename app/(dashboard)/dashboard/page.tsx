"use client";

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
      image: "https://files.tecnoblog.net/wp-content/uploads/2021/04/Qual-a-ordem-cronologica-dos-filmes-do-Batman-Deny-Freeman-Flickr.jpg",
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
    {
      id: 3,
      name: "Action Fans",
      members: 15,
      image: "https://files.tecnoblog.net/wp-content/uploads/2021/04/Qual-a-ordem-cronologica-dos-filmes-do-Batman-Deny-Freeman-Flickr.jpg",
      ratingAverage: 4.6,
      movies: [
        {
          id: 7,
          title: "Mad Max: Fury Road",
          description: "A high-octane action film.",
          assessment: 4.7,
        },
        {
          id: 8,
          title: "John Wick",
          description: "An action-packed revenge thriller.",
          assessment: 4.6,
        },
        {
          id: 9,
          title: "The Dark Knight", 
          description: "A gripping superhero action film.",
          assessment: 4.8,
        },
      ],
    }
  ];

  return (
    <Card className="w-full flex bg-linear-to-br from-background to-muted p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome back, {session?.user?.name}!</CardTitle>
      </CardHeader>
      <Card>
        <CardHeader className="text-lg font-medium">
          <CardTitle>My Groups</CardTitle>
          <CardDescription>Manage the groups you&apos;ve created or are part of to watch movies together.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {groups.map((group) => (
            <Card key={group.id} className="border flex flex-row py-0">
              <img src={group.image} alt={group.name} className="h-full w-1/2 object-cover rounded-l-md" />
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
                  <Button>Edit Group</Button>
                  <Button variant={"outline"}>Invite to Group</Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="text-lg font-medium">
          <CardTitle>Gêneros Favoritos</CardTitle>
          <CardDescription>Descubra quais gêneros você mais assiste com base na sua atividade.</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="text-lg font-medium">
          <CardTitle>Estatísticas Gerais</CardTitle>
          <CardDescription>Um resumo da sua atividade: filmes assistidos, grupos ativos e tempo de uso.</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full"></CardContent>
      </Card>
    </Card>
  );
}
