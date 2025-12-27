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

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Sembunyikan header di route tertentu atau saat belum login
  if (!isAuthenticated || HIDE_HEADER.includes(pathname)) {
    return null;
  }

  const displayName = user?.name ?? "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
        {/* Brand */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Toserba
        </Link>

        {/* Desktop Navigation */}
        <div className="ml-8 hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {NAV_ITEMS.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive(item.href)
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User Info (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Avatar className="h-7 w-7">
              {/* Jika nanti ada avatar URL dari Google */}
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

                {/* Mobile Nav */}
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-muted text-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>

                {/* Logout */}
                <form action="http://localhost:3001/auth/logout" method="post">
                  <Button variant="outline" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
