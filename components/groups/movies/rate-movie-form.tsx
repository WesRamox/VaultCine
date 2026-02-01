"use client";

import { FormEvent, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function RateMovieForm({ groupId }: { groupId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");

    try {
      const res = await fetch(`/api/groups/${groupId}/movies`, {
        method: "POST",
        body: JSON.stringify({ title, rating }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setRating(0);
        (event.target as HTMLFormElement).reset();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 pt-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          Movie Title
        </Label>
        <Input id="title" name="title" placeholder="ENTER TITLE..." className="h-12 border-2 font-bold uppercase placeholder:text-muted-foreground/50" required disabled={loading} />
      </div>

      <div className="space-y-3">
        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Classification</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={loading}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform active:scale-90 disabled:opacity-50"
            >
              <Star size={32} className={`${star <= (hover || rating) ? "fill-primary text-primary" : "fill-transparent text-muted-foreground"} transition-colors`} />
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={loading || rating === 0} className="w-full h-12 font-black uppercase tracking-widest italic">
        {loading ? <Loader2 className="animate-spin" /> : "Commit to Ledger"}
      </Button>
    </form>
  );
}
