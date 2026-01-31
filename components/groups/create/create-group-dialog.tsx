import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import CreateGroupForm from "./create-group-form";

export default function CreateGroupDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-4 text-xl h-full w-full flex gap-2 justify-center items-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 hover:text-white cursor-pointer">
          <PlusIcon size={30} /> Create a new group
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Create a new group</DialogTitle>
          <DialogDescription>Create a group with your partner or friends to save movies you’ve watched together and rate them.</DialogDescription>
        </DialogHeader>
        <CreateGroupForm />
      </DialogContent>
    </Dialog>
  );
}