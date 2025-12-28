import { useAuth } from "@/provider/auth-provider";
import { usePathname } from "next/navigation";

export function useToserbaHeader() {
  const NAV_ITEMS = [
    { title: "Produk", href: "/products" },
    { title: "Penjualan", href: "/sales" },
  ];

  // Route yang tidak menampilkan header
  const HIDE_HEADER = ["/"];

  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const isDemo = pathname.startsWith("/demo");

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Sembunyikan header di route tertentu atau saat belum login

  const displayName = user?.name ?? "User";
  const initial = displayName.charAt(0).toUpperCase();

  const withPrefix = (href: string) => {
    return isDemo ? `/demo${href}` : href;
  };


  return {
    withPrefix,
    NAV_ITEMS,
    isActive,
    initial,
    isDemo,
    isAuthenticated,
    pathname,
    user,
    displayName,
    HIDE_HEADER,
  };
}
