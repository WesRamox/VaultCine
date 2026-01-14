"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session} = useSession();
  return (
    <Card className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <div>Olá, {session?.user?.name}</div>
      <Button className="w-full" size="lg" onClick={() => signOut()}>
        Sair
      </Button>
    </Card>
  );
}