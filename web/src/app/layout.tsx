import "./globals.css";
import { AuthProvider } from "@/provider/auth-provider";
import { getMe } from "@/lib/auth";
import { Toaster } from "sonner";
import { FloatingPopover } from "@/components/layout/floating/floating-popover";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <AuthProvider user={user}>{children}</AuthProvider>
        <FloatingPopover />
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
