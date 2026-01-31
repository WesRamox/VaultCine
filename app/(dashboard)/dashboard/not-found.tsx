import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 text-center">
      <div className="relative mb-6">
        <FileQuestion className="w-24 h-24 text-muted-foreground/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold">404</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">Page Not Found</h1>
      <p className="text-muted-foreground max-w-[500px] mb-8">Oops! It looks like this page does not exist or you do not have permission to access it. Please check the address.</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/groups">View My Groups</Link>
        </Button>
      </div>
    </div>
  );
}
