import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface UserAvatarProps extends AvatarProps {
  user: { name: string };
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {/* {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : ( */}
      <AvatarFallback>
        <span className="sr-only">{user.name}</span>
        <User className="h-4 w-4" />
      </AvatarFallback>
      {/* )} */}
    </Avatar>
  );
}
