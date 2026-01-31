import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GroupList from "@/components/groups/list/group-list";
import { Suspense } from "react";
import { GroupListSkeleton } from "@/components/groups/list/group-list-skeleton";


export default async function GroupsDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  return (
    <section className="space-y-6 w-full flex flex-col">
      <header>
        <h1 className="text-2xl font-bold">Your Groups</h1>
        <p className="text-muted-foreground">See your groups and the movies you&apos;ve watched.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        <Suspense fallback={<GroupListSkeleton />}>
          <GroupList userId={session.user.id} />
        </Suspense>
      </div>
    </section>
  );
}
