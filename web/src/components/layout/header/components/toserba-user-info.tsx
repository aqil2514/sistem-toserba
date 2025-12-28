import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SERVER_URL } from "@/constants/url";
import { LogOut } from "lucide-react";
import { useToserbaHeader } from "../hooks/use-toserba-header";

export function ToserbaUserInfo() {
  const { isDemo, isAuthenticated, user, displayName, initial } =
    useToserbaHeader();
  return (
    <>
      {!isDemo && isAuthenticated && (
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Avatar className="h-7 w-7">
              {user?.avatar ? (
                <AvatarImage src={user.avatar} alt={displayName} />
              ) : (
                <AvatarFallback>{initial}</AvatarFallback>
              )}
            </Avatar>
            <span className="text-muted-foreground">{displayName}</span>
          </div>

          <form action={`${SERVER_URL}/auth/logout`} method="post">
            <Button variant="ghost" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
