import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarProfile({ avatarUrl, fallbackText }: { avatarUrl?: string | null | undefined; fallbackText: string }) {
  return (
    <Avatar>
      <AvatarImage src={avatarUrl ?? ""} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
}
