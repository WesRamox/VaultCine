"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import google from "../../public/google.svg";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <div className="lg:w-1/2 flex w-full flex-col items-center gap-8">
        <Card className="rounded-2xl lg:w-1/2 w-full lg:p-10 p-2 flex flex-col border-0 shadow-none bg-transparent">
          <CardHeader className="space-y-2">
            <CardTitle className="text-5xl text-start font-normal">
              <span className="text-zinc-800">Welcome to</span> <br />
              <span className="font-medium">
                Vault<span className="text-blue-500">Cine.</span>
              </span>
            </CardTitle>
            <CardDescription className="text-xl font-poppins">Try it for free by signing in with your Google account to start enjoying our platform.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button className="min-w-50 max-w-50 w-full p-4 text-md cursor-pointer" size="lg" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
              <Image src={google} width={20} height={20} alt="Google" /> Join with Google
            </Button>

            <p className="text-md text-muted-foreground">By continuing, you agree to our terms of use.</p>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2 hidden lg:flex items-center justify-center">
        <Image src="/bglogin.png" width={800} height={800} alt="Login Illustration" />
      </div>
    </div>
  );
}



// <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">

// </motion.div>;
