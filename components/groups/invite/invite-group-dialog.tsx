import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import InviteGroupForm from "./invite-group-form";
import { Button } from "@/components/ui/button";

interface InviteGroupDialogProps {
  groupId: string;
}

export default function InviteGroupDialog({ groupId }: InviteGroupDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"}>Invite to Group</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to Group</DialogTitle>
          <DialogDescription>Enter the email address of the person you want to invite.</DialogDescription>
        </DialogHeader>
        <InviteGroupForm groupId={groupId} />
      </DialogContent>
    </Dialog>
  );
}