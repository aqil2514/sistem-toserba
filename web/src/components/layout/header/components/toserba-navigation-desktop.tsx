import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useToserbaHeader } from "../hooks/use-toserba-header";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ToserbaNavigationDesktop() {
  const { NAV_ITEMS, withPrefix, isActive } = useToserbaHeader();
  return (
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
  );
}
