"use client"

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import * as z from "zod";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

export default function CreateGroupForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
  });

  const CreateGroupFormSchema = z.object({
    name: z.string().min(3, "Group name must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    type: z.enum(["couple", "friends", "family"], {
      message: "Type must be one of: couple, friends, family",
    }),
  });

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const validation = CreateGroupFormSchema.safeParse(formData);
    console.log("Validation result:", validation);
    if (!validation.success) {
      console.error("Form validation errors:", validation.error.format());
      return;
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="group-name-1">Group Name</Label>
          <Input id="group-name-1" name="group-name" placeholder="The Best's" onChange={(ev) => setFormData((prev) => ({ ...prev, name: ev.target.value }))} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description-1">Description</Label>
          <Input id="description-1" name="description" placeholder="This is a test" onChange={(ev) => setFormData((prev) => ({ ...prev, description: ev.target.value }))} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="´type-1">Type Group</Label>
          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="couple">Couple</SelectItem>
              <SelectItem value="friends">Friends</SelectItem>
              <SelectItem value="family">Family</SelectItem>
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
