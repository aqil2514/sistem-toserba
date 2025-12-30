import "./globals.css";
import { AuthProvider } from "@/provider/auth-provider";
import { getMe } from "@/lib/auth";
import { Toaster } from "sonner";

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
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
