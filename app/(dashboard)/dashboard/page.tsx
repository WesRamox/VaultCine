"use client";

import CreateGroupDialog from "@/components/groups/create-group-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { groups } from "@/mock/groups";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="w-full flex-col gap-6 flex bg-linear-to-br from-background to-muted">
      <header>
        <h1 className="text-2xl font-bold">Welcome back, {session?.user?.name}!</h1>
        <p className="text-muted-foreground">Are you ready to explore your groups and the movies you&apos;ve watched?</p>
      </header>
      <Card>
        <CardHeader className="text-lg font-medium">
          <CardTitle>My Groups</CardTitle>
          <CardDescription>Manage the groups you&apos;ve created or are part of to watch movies together.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {groups.map((group) => (
            <Card key={group.id} className="border flex flex-row py-0">
              <div className="h-55 w-1/2 object-cover rounded-l-md overflow-hidden">
                <Image width={500} height={500} src={group.image} alt={group.name} className="w-full h-full" />
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
    </section>
  );
}
