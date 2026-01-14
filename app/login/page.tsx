"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film } from "lucide-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <Card className="rounded-2xl shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Film className="text-primary" size={28} />
              </div>
            </div>
            <CardTitle className="text-2xl">Movie Group</CardTitle>
            <CardDescription>Registre filmes assistidos com quem você gosta</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button className="w-full" size="lg" onClick={() => signIn("google")}>
              Entrar com Google
            </Button>

            <p className="text-xs text-center text-muted-foreground">Ao continuar, você concorda com nossos termos de uso.</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
