import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SERVER_URL } from "@/constants/url";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useToserbaHeader } from "../hooks/use-toserba-header";
import { cn } from "@/lib/utils";

export function ToserbaNavigationMobile(){
    const {isDemo, isAuthenticated, user, displayName, initial, NAV_ITEMS, withPrefix, isActive} = useToserbaHeader()
    return (
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <div className="mt-6 flex flex-col gap-6">
                {/* User Info (Mobile) */}
                {!isDemo && isAuthenticated && (
                  <div className="flex items-center gap-3 px-1">
                    <Avatar>
                      {user?.avatar ? (
                        <AvatarImage src={user.avatar} alt={displayName} />
                      ) : (
                        <AvatarFallback>{initial}</AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-sm font-medium">{displayName}</span>
                  </div>
                )}

                {/* Mobile Nav */}
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => {
                    const href = withPrefix(item.href);

                    return (
                      <Link
                        key={href}
                        href={href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive(href)
                            ? "bg-muted text-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </nav>

                {/* Logout */}
                {!isDemo && isAuthenticated && (
                  <form action={`${SERVER_URL}/auth/logout`} method="post">
                    <Button variant="outline" className="w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </form>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
    )
}