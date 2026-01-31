"use client";

import { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import * as z from "zod";
import { DialogClose, DialogFooter } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateGroupFormSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters long"),
  description: z.string().optional(),
  type: z.enum(["COUPLE", "FRIENDS", "FAMILY"], {
    message: "Type must be one of: couple, friends, family",
  }),
});

export type CreateGroupFormData = z.infer<typeof CreateGroupFormSchema>;

export default function CreateGroupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateGroupFormData>({
    name: "",
    description: "",
    type: "COUPLE",
  });

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const validation = CreateGroupFormSchema.safeParse(formData);

    if (!validation.success) {
      toast.error("Validation Error", {
        description: "Please check the form fields.",
        position: "top-center",
      });
      return;
    }

    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error("Error creating group", {
          description: error.message || "An unexpected error occurred.",
          position: "top-center",
        });
        return;
      }

      const group = await response.json();

      toast.success("Group created!", {
        description: `The group "${group.name}" has been created successfully.`,
        position: "top-center",
      });

      router.refresh();
    } catch (error) {
      toast.error("Connection Error", {
        description: "Could not reach the server.",
        position: "top-center",
      });
      console.error("Error creating group:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="group-name">Group Name</Label>
          <Input id="group-name" placeholder="The Dream Team" onChange={(ev) => setFormData((prev) => ({ ...prev, name: ev.target.value }))} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Input id="description" placeholder="A group for our movie nights" onChange={(ev) => setFormData((prev) => ({ ...prev, description: ev.target.value }))} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="type">Group Type</Label>
          <Select defaultValue="COUPLE" onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as CreateGroupFormData["type"] }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COUPLE">Couple</SelectItem>
              <SelectItem value="FRIENDS">Friends</SelectItem>
              <SelectItem value="FAMILY">Family</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Create Group</Button>
      </DialogFooter>
    </form>
  );
}
