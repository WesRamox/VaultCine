import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InviteGroupFormProps {
  groupId: string;
}

export default function InviteGroupForm({ groupId }: InviteGroupFormProps) {
  return (
    <form>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="email-1">Email Address</Label>
          <Input id="email-1" name="email" type="email" placeholder="Enter email to invite" />
        </div>
      </div>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Send Invite</Button>
      </DialogFooter>
    </form>
  );
}