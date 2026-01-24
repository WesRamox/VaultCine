import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SunIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function ThemeSettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex w-full items-center justify-start gap-2 font-normal" variant={"ghost"}>
          <SunIcon className="h-4 w-4" />
          Theme Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Theme Settings</DialogTitle>
          <DialogDescription>Customize your theme preferences.</DialogDescription>
          <ModeToggle />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}