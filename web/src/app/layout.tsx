import { ToserbaFooter } from "@/components/layout/footer/toserba-footer";
import { ToserbaHeader } from "@/components/layout/header/toserba-header";
import "./globals.css";
import { AuthProvider } from "@/provider/auth-provider";
import { getMe } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <AuthProvider user={user}>
          <ToserbaHeader />

          {/* Content */}
          <div className="flex-1">{children}</div>

          <ToserbaFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
