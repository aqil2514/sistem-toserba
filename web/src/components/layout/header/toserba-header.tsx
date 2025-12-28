"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/auth-provider";

const NAV_ITEMS = [
  { title: "Produk", href: "/products" },
  { title: "Penjualan", href: "/sales" },
];

// Route yang tidak menampilkan header
const HIDE_HEADER = ["/"];

export function ToserbaHeader() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const isDemo = pathname.startsWith("/demo");

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Sembunyikan header di route tertentu atau saat belum login
  if (!isDemo && (!isAuthenticated || HIDE_HEADER.includes(pathname))) {
    return null;
  }

  const displayName = user?.name ?? "User";
  const initial = displayName.charAt(0).toUpperCase();

  const withPrefix = (href: string) => {
    return isDemo ? `/demo${href}` : href;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 gap-4">
        {/* Brand */}
        {isDemo && (
          <span className="ml-4 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
            Demo Mode
          </span>
        )}

        <Link
          href={isDemo ? "/demo/dashboard" : "/dashboard"}
          className="text-lg font-semibold tracking-tight"
        >
          Toserba{" "}
        </Link>
        {/* Desktop Navigation */}
        <div className="ml-8 hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {NAV_ITEMS.map((item) => {
                const href = withPrefix(item.href);

                return (
                  <NavigationMenuItem key={href}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive(href)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Link href={href}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User Info (Desktop) */}
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

            <form action="http://localhost:3001/auth/logout" method="post">
              <Button variant="ghost" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
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
                  <form
                    action="http://localhost:3001/auth/logout"
                    method="post"
                  >
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
      </div>
    </header>
  );
}
