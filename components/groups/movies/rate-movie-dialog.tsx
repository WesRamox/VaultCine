import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import RateMovieForm from "./rate-movie-form";
import { Button } from "@/components/ui/button";

export default function RateMovieDialog({ groupId }: { groupId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-full flex gap-2 justify-center items-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer tracking-tighter font-semibold">
          <Star size={30} className="fill-current" /> Rate new Movie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase italic">Add to Ledger</DialogTitle>
          <DialogDescription className="font-medium">Register a movie into the group archive and submit your collective score.</DialogDescription>
        </DialogHeader>
        <RateMovieForm groupId={groupId} />
      </DialogContent>
    </Dialog>
  );
}
