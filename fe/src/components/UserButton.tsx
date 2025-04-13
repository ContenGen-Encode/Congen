import { SignOutButton, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";

export default function UserButton() {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Avatar>
            <AvatarImage src={user?.imageUrl} alt="User profile image" />
            <AvatarFallback>
              {user?.firstName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="truncate">
            {user?.primaryEmailAddress?.emailAddress}
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        sideOffset={5}
        align="end"
        className="w-[--radix-popper-anchor-width]"
      >
        <DropdownMenuItem>
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
