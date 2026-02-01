import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateGroupDialog from "@/components/groups/create/create-group-dialog";
import GroupLimitedList from "@/components/groups/list/group-limited-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Boxes, PlusIcon, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  return (
    <section className="w-full flex-col gap-6 flex">
      <header>
        <h1 className="text-2xl font-bold">Welcome back, {session.user.name}!</h1>
        <p className="text-muted-foreground">Are you ready to explore your groups and the movies you&apos;ve watched?</p>
      </header>
      <Card>
        <CardHeader className="text-lg font-medium">
          <CardTitle>Last Groups</CardTitle>
          <CardDescription>Manage the groups you&apos;ve created or are part of to watch movies together.</CardDescription>
        </CardHeader>
        <Suspense fallback={<div className="flex items-center justify-center w-full">Loading...</div>}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-4 w-full">
            <GroupLimitedList session={session} />
            <CreateGroupDialog />
            <Button variant={"outline"} className="p-4 h-full text-xl flex gap-2 justify-center items-center rounded-lg cursor-pointer font-normal" asChild>
              <Link href="/dashboard/groups">
                <Boxes size={30} strokeWidth={1.5} /> See All Groups
              </Link>
            </Button>
          </CardContent>
        </Suspense>
      </Card>
    </section>
  );
}
