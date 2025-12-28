"use client";

import { useToserbaHeader } from "./hooks/use-toserba-header";
import { ToserbaBrand } from "./components/toserba-brand";
import { ToserbaNavigationDesktop } from "./components/toserba-navigation-desktop";
import { ToserbaNavigationMobile } from "./components/toserba-navigation-mobile";
import { ToserbaUserInfo } from "./components/toserba-user-info";

export function ToserbaHeader() {
  const {
    isAuthenticated,
    isDemo,
    pathname,
    HIDE_HEADER,
  } = useToserbaHeader();

  if (!isDemo && (!isAuthenticated || HIDE_HEADER.includes(pathname))) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 gap-4">
        <ToserbaBrand />
        <ToserbaNavigationDesktop />

        <div className="flex-1" />

        <ToserbaUserInfo />

        <ToserbaNavigationMobile />
      </div>
    </header>
  );
}
