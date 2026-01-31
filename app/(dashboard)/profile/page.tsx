import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const ownedGroups = await prisma.group.findMany({
    where: {
      ownerId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  const typeStyles = {
    COUPLE: "bg-pink-500 hover:bg-pink-600",
    FRIENDS: "bg-green-500 hover:bg-green-600",
    FAMILY: "bg-blue-500 hover:bg-blue-600",
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your profile information.</p>
      </header>
      <div className="p-4 flex gap-4 items-center space-y-2">
        <Image className="rounded-3xl" src={session.user.image || ""} alt="Profile Picture" width={100} height={100} />
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">{session.user.name}</h2>
          <p className="text-muted-foreground text-md">{session.user.email}</p>
          <Badge className="text-xs text-blue-400">Premium</Badge>
        </div>
      </div>
      <div className="ownedGroups px-4">
        {ownedGroups.length > 0 ? (
          <Card className="px-4 gap-0">
            <h2 className="text-lg font-medium mb-2">Groups You Own:</h2>
            {ownedGroups.map((group) => (
              <Link key={group.id} className="text-muted-foreground p-2 flex justify-between items-center" href={`/groups/${group.id}`}>
                {group.name} <Badge className={typeStyles[group.type]}>{group.type}</Badge>
              </Link>
            ))}
          </Card>
        ) : (
          <p className="text-muted-foreground">You do not own any groups.</p>
        )}
      </div>
    </section>
  );
}
