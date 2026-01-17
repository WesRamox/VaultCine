"use client";

import AvatarProfile from "@/components/avatar-profile/avatar-profile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  const userFallback =
    session?.user?.name
      ?.split(" ")
      .slice(0, 2)
      .map((name) => name[0])
      .join("") ?? "";

  return (
    <Card className="w-full flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <Card className="p-4">
        <div className="flex items-center justify-center gap-2">
          <div>
            <AvatarProfile fallbackText={userFallback} avatarUrl={session?.user?.image} />
          </div>
          <div>
            <h2 className="text-xl font-normal">{session?.user?.name}</h2>
          </div>
        </div>
        <Button className="w-full" size="lg" onClick={() => signOut()}>
          Sair
        </Button>
      </Card>
    </Card>
  );
}
