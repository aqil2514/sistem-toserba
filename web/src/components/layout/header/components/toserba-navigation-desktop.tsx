import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useToserbaHeader } from "../hooks/use-toserba-header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NAVIGATION_ITEMS } from "../constants/nav-items";
import React from "react";
import { RouteItems } from "../types/nav-items.interface";

export function ToserbaNavigationDesktop() {
  const { withPrefix, isActive } = useToserbaHeader();
  return (
    <div className="ml-8 hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          {NAVIGATION_ITEMS.map((item, i) => {
            const content = item.contents;
            return (
              <NavigationMenuItem key={`navigation-item-${i + 1}`}>
                <NavigationMenuTrigger>
                  {item.trigger.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-xl">
                    <ul className="grid grid-cols-2 gap-2">
                      {content.map((item, i) => (
                        <LinkItem
                          item={item}
                          isActive={isActive}
                          withPrefix={withPrefix}
                          key={`navigation-link-item-${i + 1}`}
                        />
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const LinkItem: React.FC<{
  item: RouteItems;
  withPrefix: (href: string) => string;
  isActive: (href: string) => boolean;
}> = ({ item, withPrefix, isActive }) => {
  const href = withPrefix(item.href);

  return (
    <NavigationMenuLink
      className={cn(
        "px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive(href)
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
      asChild
    >
      <Link href={href}>
        <div>
          <item.icon className="size-6" />
          <p className="font-semibold">{item.title}</p>
          <p className="text-xs font-semibold">{item.description}</p>
        </div>
      </Link>
    </NavigationMenuLink>
  );
};
