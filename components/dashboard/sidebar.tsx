"use client";

import { Home, Users, User2Icon, Popcorn, X, CheckIcon, Mail } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavUser } from "../nav-user/nav-user";
import { Prisma } from "@prisma/client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

type PendingInvitesWithGroup = Prisma.InviteGetPayload<{
  include: { group: true };
}>;

interface DashboardSidebarProps {
  session: {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
  pendingInvites: PendingInvitesWithGroup[];
}

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Groups",
    url: "/dashboard/groups",
    icon: Users,
  },
  {
    title: "Movies",
    url: "/dashboard/movies",
    icon: Popcorn,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User2Icon,
  },
];

export function DashboardSidebar({ session, pendingInvites }: DashboardSidebarProps) {
  const router = useRouter();
  const handleInviteAction = async (inviteId: string, action: "ACCEPT" | "DECLINE") => {
    try {
      const res = await fetch(`/api/invites/${inviteId}`, {
        method: "PATCH",
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        toast.success(action === "ACCEPT" ? "Joined group!" : "Invite declined", {
          description: action === "ACCEPT" ? "You have successfully joined the group." : "You have declined the invite.",
          position: "top-center",
        });
        router.refresh();
      } else {
        toast.error("Something went wrong", {
          description: "Please try again later.",
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Connection error: " + error);
    }
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 h-16">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            M<span className="text-blue-500">G</span>
          </div>
          <span className="font-semibold group-data-[collapsible=icon]:hidden">
            Movies<span className="text-blue-500">Group</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="mr-2">
        <SidebarGroup>
          <SidebarGroupLabel>Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip="Invites" className="relative">
                      <Mail />
                      <span>Invites</span>
                      {pendingInvites.length > 0 && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white group-data-[collapsible=icon]:hidden">
                          {pendingInvites.length}
                        </span>
                      )}
                      {pendingInvites.length > 0 && <span className="absolute top-2 left-5 h-2 w-2 rounded-full bg-blue-500 hidden group-data-[collapsible=icon]:block" />}
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-80 p-0">
                    <DropdownMenuLabel className="p-4">Pending Invites ({pendingInvites.length})</DropdownMenuLabel>
                    <DropdownMenuSeparator className="m-0" />
                    <div className="max-h-[300px] overflow-y-auto">
                      {pendingInvites.length === 0 ? (
                        <div className="p-8 text-center text-sm text-muted-foreground">No pending invites</div>
                      ) : (
                        pendingInvites.map((invite) => (
                          <div key={invite.id} className="flex flex-col gap-3 p-4 border-b last:border-0 hover:bg-accent/50 transition-colors">
                            <p className="text-sm leading-none">
                              Invite to <span className="font-bold">{invite.group.name}</span>
                            </p>
                            <div className="flex gap-2">
                              <Button size="sm" className="h-8 flex-1 gap-1" onClick={() => handleInviteAction(invite.id, "ACCEPT")}>
                                <CheckIcon className="h-3.5 w-3.5" /> Accept
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 flex-1 gap-1" onClick={() => handleInviteAction(invite.id, "DECLINE")}>
                                <X className="h-3.5 w-3.5" /> Decline
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
