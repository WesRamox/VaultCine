"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface InviteGroupFormProps {
  groupId: string;
}

export default function InviteGroupForm({ groupId }: InviteGroupFormProps) {
  const [email, setEmail] = useState<string>("");

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    try {
      const res = await fetch(`/api/groups/${groupId}/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("User invited!", {
          description: "Invite sent successfully!",
          position: "top-center",
        });
        document.getElementById("close-dialog")?.click();
      } else {
        toast.error("Failed to send invite", {
          description: "Please try again later.",
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("Connection error: " + err, {
        description: "Please check your internet connection and try again.",
        position: "top-center",
      });
    } finally {
      setEmail("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="email-1">Email Address</Label>
          <Input id="email-1" name="email" type="email" placeholder="Enter email to invite" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline" id="close-dialog">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={!email}>Send Invite</Button>
      </DialogFooter>
    </form>
  );
}
